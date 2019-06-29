import React from 'react'
import logo from './logo.jpg'
import './logo.less'


export default function () {
   return (
       <div className="logo-container">
           <img
            src={logo}
            className="logo-img"
            alt="logo" />
       </div>
   ) 
}