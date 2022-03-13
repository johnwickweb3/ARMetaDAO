import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import './index.css';
import routes from './router/router'
import reportWebVitals from './reportWebVitals';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';


import { Provider } from "react-redux";
import store from "./libs/store"

import LeftBar from "./components/LeftBar/LeftBar";

import CreateARMeta from "./pages/CreateARMeta/CreateARMeta"
var wallet = store.getState().walletModel.wallet;

ReactDOM.render(

  <BrowserRouter>
    {/* <CacheSwitch>
        <CacheRoute exact path="/marketplace" component={NFTList} />
     
      </CacheSwitch> */}
{/* 
    {wallet == "" ? (<div><Redirect to="/login"></Redirect>  </div>)
     
    : (null)} */}
   



  <div className='container'>
    <div className='containerL' >
    <LeftBar></LeftBar>
    </div>
    <div className='containerR'>
      {routes.map((item) => {
        return (<Route key={item.path} {...item} />);
      })}
    </div>
  </div>
    





  </BrowserRouter>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
