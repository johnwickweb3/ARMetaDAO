import React, { useState, useEffect } from "react";

import { withRouter } from 'react-router-dom'

import { Upload, Button, message } from 'antd';

import { network } from "../../libs/network";
import axios from "axios";

import store from "../../libs/store"
import "./Wallet.css"
function Wallet(props) {




    // var loginWallet=JSON.parse('{"kty":"RSA","n":"xdEWn5OtEUVfN5tGX7E73wtIGNT2wKf3NZa3bqTEvC8yVhMSRXxmMx555puRfsWY6-SXc5Mv5S4DPa-KiCt9tLBDPizXn8dQ6zI6N5fuRa0hmVHphEDXIOZ5EFxIYqZe3HmrAh5xQJors3SFMBhPcBoCzxOd8Ce8Th78VysMjYnny1q0GfywcxZD87Rao-lrEZQh3pVOw_bkvAoIlaUE9SZKKW3JEWaOIQzFMfk910ngL6frqfIlgMRtQv3VoTpSHTPBVNDEfW-9W7T6nocHtMwLB8NK4ov9u0x2vILVK-_MbD9s3Nrn1L5roGcaUaAA96D1hxfdBPhOjiaXXuMNZeYOPYCkneke0ba7gX_G-8n9rFpylya7twTFoPAj1JSnftrVjBBXd5mt7EM0z76zdNN6yk-4S89Dwoc4ussPxzVLYmFB22WkQHjtEqg1QHq4ASqAmP1LSwywihZGhnycpJH8Ty7zaKUvwlasvA9ZPM3o2pzJG4cmTgJth-Qul-L3cNQ4__T-LOzMdJ9Ey3BraBYLu9GvnWo4T8yJYEKN9CCsrVepCkoGcz2_Y78smLJlQ8o9Or4cBoDeFv1QWUyZgrNBLEzAojGJ28LtzF4pmakKDKAtv9Y7XzpqY0NttFp8n2U6R-tADL_cp3evy13sE4q_xFavL4_EJKa1VL50chU","e":"AQAB","d":"ErIqQza_2qwFzcmdIxorIG9-hupJz_eQA76U454rAeYsCbqPtYWGWzp8JvF5FNQ0GcdnEQNOOYjZwZC_tRL3NIacNFoknvNFkJUUr4BqgqdUT5tQSLGgI3nk40j1hm1W9duB8BdUeNiZXMKce-kwSNYMgenGuZXn1DJVgx-Mdiwcfjm6X-JkAtyN25CmKGu9NNIdSV4vLZI-GA-StCH-j_ToeXXo1P4uXK1KTejSkXBoAdkLCurZ5IusD_LRqAVNEXl8wjlg-MIA0ZQPQ8BbWBkYyckJYNP-TR9y8WokH5zwYyKzdUQzOQYuQeC8ug43STArRHNa7kdRlVnMYKlw8I_d3DBQHjJzXIjO4v5xetcxjQ3aXH00D5f_9by8JqW70m4vnEby6nqg3pa7r9wKc3jdGygtV_VszvaK1qGwiUt4WQnnW0_7wLVpKXJvawNAuc_S2bjXurU98Ug8WiswqxE-dVxTeBRxZAeTPPQ3fBhzZbTcftuKbg6gwjaUCyHnJj_HzgfilkoPPutiSRCUtEWVZwbnNDHDoUznpjVhVxS-911mpX8BxJm78lh1NTTlWQGkprPxz3g7l4PCRzuecaoItRr0uqwyvxSavNUeOJm4z9raptIklPU1uRKuTrqVU0xIZEgNvSbQQFxw86lYJxuoRPpCRLn_3M8lIaDV8hk","p":"8wbirNme_MEn3UPsVcHyVYyqNtHMFII9Vhh29BRhe_HyphTBg_QJojhcg9foI3GIhrdiX1fvR34S8kyo7CHoGxAo-iossiLg9oX2O9_742G1HSNlfd7FiL88VnWnAF20rhfAbU0gWxIP3b9szVqi3FXNnf_2lmiD0FjxBlsT2UzdQ5EFMOVO8Ku6LuKdY6n9MWgznTkjWQlBc7DIm8NStdzdkL77FE2TrmQE0iFdDCiUlVB93MJZ6_SjHLWwZF-OwNRfQH4rguHfSGDg3pvx4BkMkf-1C_8d8BwPgHTGwvrOxfnRkyHZ7rHCBGPhOxHjLgv0rS9WrhFEaPloZ9vBrw","q":"0GBgxZAJpUvEn-BnkCssT0-FQ3oC4pbZUXQjl004_ajk0WSwKBJc9RbIOJ1bAxECEWOZ-nC4_u_oz0nsfIPG9x2HLQxj66uqrrbX1Nzv1hZbPTJ8APnOoUKev9S9x1mLDEA0C5i1kg155H-uAmkOKsvqLzds2oj8fgMHzu_MM-TttZpuVqEAgqLLsGVNbNEWfBYoOSo35grOgsxlL50Qwe8iq6LE1GDbHeyFBArAO5T4UgkTe-eLRIWb6XUXQ2oXTlQJ0T8sKqvRhaJvWRKV2ZSaZYf9iAyDrORYNWZ6U3mi7UvYm_tEEf-ImAa5MFVqz6BcFKikDOfpIHmDxh-New","dp":"4MwUrshaDPhqdHxYxvawvztvU2f6u1nBfLsChUG47ppd1gxK-FCq_Jff08DKJMbm_53v67t-RQY0ZlZMxqeSeD4ZeVW7pEcpCj_eBYJpD-oYSsysG6MN2zDxkhQgFvGWqJal0zTNYhAyBu8DqGxXSzI_ERBsOrKQgw9SW4uxr4YvAUnKoHDr9SkT_jx2U3MxFhuJ6ruom7o5BdeXqKUjA8A6XqKZwy0DFwPDhc-Arzd2QSuEUMihvuW6X1scv6u4c1u-g_xxKQ7fp6adOqzLLnxdKUt7X45rVefO2wapuD-hNnWfytY8LVPV4JO3ChnAp549hFjOeBLW0bcqQS-AVw","dq":"f8J30unLYDOibLv0A2rVEhOZi5OlbTQ8LjrdD4ljZfNFyDTJ5OfNYuADBuNDyA-Hiw3cfLbcVkLWJTIX8wgA18ac-LveD8MDNXgZwQNtcX_nlQ_9A8QmMq1cFBXl_fIi1PIQdwO8X74vfC_kisnKy-aWwThkX2EaHlDRWsmgFDlKncv_1tGENJSH-rFB1XQlKxOSuenut_bsQzn62ESe36k1QrLbp7Ny5Vf8_ktxLZba4cF61r9SnkKlI3CNQOItQ_M2ybrH46nRHvRG_P_uLKd2OsY0ZlP17-1ZP_SDD-dGQ-P6_TgDtl1MbJnCtaXJhV-21VvIqbkPMMAQUUtLPQ","qi":"dq8TML2GJEQun5Omuq95j1Coaoo16YZPPu1NPxNfH2b9KziDBCB6bjG-dQEBmoMVSAvqQuEFml-IU3CaKGaLmGWfDB5MtlRoEkKSpdXAycwL4sh0B1VBWfGbQE3aoJturIePhX_N8kIzhDcYmMazVTcMiB2Mvnt1dnEjmkOxrP0v0KFcRy3F1hjvyhGj2cK0ugpaIfUIhlP3NaAT9dtehU9Sbi7zD0Muc0KcLf8HbW3HtXcYAU_HlFPwRAqpLIVrmH5qQwgRkafHCpXjLZxCiUrJU7IjgDmavzmjZD37Eql7lbPMhCRx7LlTsyJaCDkBgnBSgEGbXP3HXAUr6Fisww"}')
    var loginWallet = store.getState().walletModel.wallet;


    const [wallet, setWallet] = useState([]);
    const [address, setAddress] = useState([]);
    const [balance, setBalance] = useState([]);

    const arweave = network.arweave;


    useEffect(async () => {
        if (loginWallet != "") {
            await getWalletInfo(loginWallet);
        }
    });



    var getWalletFile = async (file) => {


        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async () => {

            var wallet = JSON.parse(reader.result);

            await getWalletInfo(wallet);

            store.dispatch.walletModel.setWallet(wallet);





        }
        return Upload.LIST_IGNORE;
    }

    var getWalletInfo = async (wallet) => {
        var address = await arweave.wallets.jwkToAddress(wallet);
        var winston = await arweave.wallets.getBalance(address);
        var balance = arweave.ar.winstonToAr(winston);
        balance = Math.floor(balance * 10000) / 10000
        setWallet(wallet);
        setAddress(address);
        setBalance(balance);
    }

    var getShortAddress = (address) => {
        if (address.length > 0) {
            let end = address.length;
            let addressShort =
                address.substring(0, 10) +
                "..." +
                address.substring(end - 4, end);
            return addressShort;
        }

    }

    var logout=async()=>{
        window.location.reload();
    }

    var faucet=async()=>{
      
        axios.get('https://testnet.redstone.tools/mint/'+address+"/1000000000000")
        .then(function (response) {
          console.log(response);
          if(response.data>0){
              message.success("Success")
             getWalletInfo(wallet)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }

    return (
        <div>

            {wallet == "" ? (
                <div className="welcome">
                    <h1>Welcom Back！</h1>
                   
                        <p className="welcome_tip">ARMetaDAO is currently deployed</p>
                        <span className="welcome_network">testnet.redstone.tools (redstone-testnet)</span>
                
                  

                    <Upload
                        maxCount="1"
                        beforeUpload={getWalletFile.bind(this)}
                        showUploadList={false}
                        accept=".json" >
                        <div className="loginbtn">Login with Keyfile</div>
                    </Upload>
                </div>

            ) : (
                <div className="walletinfo">
               
                        <div className="walletinfo_tit">My Wallet</div>
                        <div className="walletinfo_address">{address}</div>
                        <div className="balance_color">{balance}AR</div>

                    <div className="walletinfo_btns">
                    <div className="Faucet" onClick={faucet.bind(this)}>
                        Faucet
                    </div>
                
                    <div className="Logout" onClick={logout.bind(this)}>
                         Logout
                    </div>
                    </div>
      
                </div>
            )}

        </div>
    )


}
export default withRouter(Wallet);