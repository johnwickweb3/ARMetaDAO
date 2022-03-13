import React, { Component } from "react";
import "./LeftBar.css";
import { Link,withRouter } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import leftbarlogo from "../../assets/armetadao.svg"
import logout from "../../assets/logout.svg"
import fileadd from "../../assets/fileadd.svg"
import inbox from "../../assets/inbox.svg"
import walleticon from "../../assets/wallet.svg"
import about from "../../assets/book.svg"
import store from "../../libs/store";
import { Divider, message } from "antd";
class LeftBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin:false,
            menuItems: [{
                name: "My Wallet",
                isChecked: true,
                link:"/MyWallet",
                image:walleticon,
                login:false
            }, {
                name: "Create ARMeta",
                isChecked: false,
                link:"/CreateARMeta",
                image:fileadd,
                login:true
            }, {
                name: "My ARMeta",
                isChecked: false,
                link:"/MyARMeta",
                image:inbox,
                login:true
            }, {
                name: "About",
                isChecked: false,
                link:"/About",
                image:about,
                login:false
            }]
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    selectMenu = (index) => {
        var menuItems = this.state.menuItems;

        var wallet = store.getState().walletModel.wallet;
        if(wallet==""&&menuItems[index].login){
            message.error("Please log in to your wallet!")
         
        }else{

            this.props.history.push(menuItems[index].link)

            for (var item in menuItems) {
                if (item == index) {
                    menuItems[item].isChecked = true;
                } else {
                    menuItems[item].isChecked = false;
                }
            }
            this.setState({
                menuItems: menuItems
            })

        }
        




    }

    render() {
        return (
       
            <div className="leftbar">
                <div className="leftbar_logo">
                    <img src={leftbarlogo} width="200"></img>
                </div>
                {/* <Wallet></Wallet> */}
                <ul className="leftbar_menu">
                    {this.state.menuItems.map((item, index) => (
             
                           
                            <div key={index} className={item.isChecked ? "leftbar_menu_select" : "leftbar_menu_nor"} onClick={this.selectMenu.bind(this, index)} to={item.link} >
                               <img src={item.image} width="32"></img>  {item.name}
                            </div>
                    ))}

                </ul>
            </div>
        )
    }
}
export default withRouter(LeftBar);