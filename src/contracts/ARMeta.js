export var ARMetaContract=`export function handle(state, action) {
    const input = action.input;
    const caller = action.caller;

    if (input.function === "createVote") {
        isMember(caller)

        isRule(input.voteType);    
      
        var vote = {
            "voteType": input.voteType,
            "creator": caller,
            "startTime": SmartWeave.block.timestamp,
            "status":0,
            "voteHistory": [],
        };
        switch (input.voteType) {
            case 0:
                vote.memberAddress = input.memberAddress;
                break;

            case 1:
                vote.memberAddress = input.memberAddress;
                break;

            case 2:
                vote.image = input.newImage;
                break;

            case 3:
                vote.name = input.name;
                break;

            case 4:
                vote.description = input.description;
                break;

            case 5:
                vote.attributes = input.attributes;
                break;

            case 6:
                vote.attributesIndex = input.attributesIndex;
                break;

            case 7:
                vote.governance = input.governance;
                break;

        }
        state.votes.push(vote);
        return {state}


    }


    if(input.function==="getState"){
        return{
          result:{
            state
          }
        }
    }

    if(input.function==="testState"){
        state.votes.push({"from":"haha"});
      return{
        state
      }
    }


    if (input.function === "vote") {

       var voteIndex=input.voteIndex;
       isMember(caller);
       isEnd(voteIndex);
       isVoted(voteIndex,caller);
       isResult(voteIndex)

       
        var voteType=state.votes[voteIndex].voteType;
        if(voteType!=8){

            var myVote=input.vote;
           // checkVote(myVote);
    
            state.votes[voteIndex].voteHistory.push({
                from:caller,
                vote:myVote
            })

            var voteStatus=voteResult(state.votes[voteIndex].voteHistory);
            state.votes[voteIndex].status=voteStatus;

            if(voteStatus==1){
                var vote=state.votes[voteIndex];
                switch (voteType) {
                    case 0:

                        for(var i=0;i<vote.memberAddress.length;i++){
                            state.daoMembers.push(vote.memberAddress[i]);
                        }
                    
                        break;
        
                    case 1:

                        for(var i=0;i<vote.memberAddress.length;i++){
                            var index=state.daoMembers.indexOf(vote.memberAddress[i]);
                            state.daoMembers.splice(index,1);
                        }
                        break;
        
                    case 2:

                        state.image = vote.image;
                        break;
        
                    case 3:
                        state.name = vote.name;
                        break;
        
                    case 4:
                        state.description = vote.description;
                        break;
        
                    case 5:
                        for(var i=0;i<vote.attributes.length;i++){
                            state.attributes.push(vote.attributes[i]);
                        }
                        break;
        
                    case 6:
                        for(var i=0;i<vote.attributesIndex.length;i++){
                            state.attributes.splice(vote.attributesIndex[i],1);
                        }
                        break;
        
                    case 7:
                        state.governance = vote.governance;
                        break;
        
                }
            }

        }else{

        }

        
        return{state}
 


    }




    function isMember(address) {
        if (state.daoMembers.indexOf(address) == -1) {
            throw new ContractError('You are not a member of the DAO')
        }
    }

    function isEnd(voteIndex) {
        var startTime = parseInt(state.votes[voteIndex].startTime);
        var voteTime = parseInt(state.governance.voteTime);
        var nowTime = SmartWeave.block.timestamp/1000;
        if (nowTime > (startTime + voteTime)) {
            throw new ContractError('Voting time has expired')
        }
    }

 

    function isVoted(voteIndex, address) {
        var voteHistory = state.votes[voteIndex].voteHistory;
        for (var i = 0; i < voteHistory.length; i++) {
            if (voteHistory[i].from == address) {
                throw new ContractError('You have already voted')
            }
        }
    }

    function isResult(voteIndex){
        var status = state.votes[voteIndex].status;
        if(status!=0){
            throw new ContractError('Voting has closed')
        }
    }

    function checkVote(vote){
        if(vote!=0||vote!=1){
            throw new ContractError('Voting is illegal')
        }
    }

    function voteResult(voteHistory){
        var status=0
        var totalCount=voteHistory.length;
        var disagreeCount=0;
        var agreenCount=0;
        var voteRate=state.governance.voteRate/100;
        for(var i=0;i<totalCount;i++){
            if(voteHistory[i].vote==0){
                disagreeCount++
            }else{
                agreenCount++
            }
        }
        var disagreeRate=disagreeCount/totalCount;
        var agreenRate=agreenCount/totalCount;
        if(agreenRate>=voteRate){
            status=1;
        }else if(disagreeRate>=voteRate){
            status=2;
        }
        return status;
    }

    function isRule(voteType){
        var rules=state.governance.governanceRules;
        switch(voteType){
          case 0:
            if(!rules.daoMembers){
                 throw new ContractError('daoMembers cannot be modified')
            }
          break;
          case 1:
            if(!rules.daoMembers){
                 throw new ContractError('daoMembers cannot be modified')
            }
          break;
          case 2:
            if(!rules.image){
                 throw new ContractError('image cannot be modified')
            }
          break;
          case 3:
            if(!rules.name){
                 throw new ContractError('name cannot be modified')
            }
          break;
          case 4:
            if(!rules.description){
                 throw new ContractError('decription cannot be modified')
            }
          break;
          case 5:
            if(!rules.attributes){
                 throw new ContractError('attributes cannot be modified')
            }
          break;
          case 6:
            if(!rules.attributes){
                 throw new ContractError('image cannot be modified')
            }
          break;
          case 7:
            if(!rules.governance){
                 throw new ContractError('name cannot be modified')
            }
          break;
        }
    }


}`
