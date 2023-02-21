import React from 'react'
import { Link } from "react-router-dom"
import home from "../../assets/HomeAssets/logohomemenu.png"
import start from "../../assets/HomeAssets/logostartmenu.png"
import diario from "../../assets/HomeAssets/logodiariomenu.png"
// import share from "../../assets/HomeAssets/logosharemenu.png"
import profile from "../../assets/profile.png"
import "./StaticMenu.scss"


export default function StaticMenu() {
    return(
        <div className='thestaticMenu'>
            <div className='staticMenu'>
                <div><Link to="/home"><img className='staticMenu-img' src ={home} alt="home"/></Link></div>
                <div><Link to="/evaluate"><img className='staticMenu-img' src ={start} alt="home"/></Link></div>
                <div><Link to="/diary"><img className='staticMenu-img' src ={diario} alt="home"/></Link></div>
                <div><Link to="/profile"><img className='staticMenu-img' src ={profile} alt="home"/></Link></div> 
            
            </div>
        </div>
            
    )
}