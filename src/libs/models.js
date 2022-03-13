export const walletModel = {
  state: {
    wallet:""
  }, 
  reducers: {
    
    setWallet(state,payload) {
      return{
        ...state,
        wallet:payload
      }
    },

  }
};