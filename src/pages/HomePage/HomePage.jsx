import React from 'react'
import "./HomePage.scss"
import buttonInfo from "../../assets/HomeAssets/buttoninfo.png"
import logohome from "../../assets/HomeAssets/logohome.png"
import scanimg from "../../assets/HomeAssets/scanimg.png"
import searchimg from "../../assets/HomeAssets/searchimg.png"
import sos from "../../assets/HomeAssets/sosimg.png"
import StaticMenu from '../../components/HomePageComponents/StaticMenu'
import PopupDemo from '../../components/HomePageComponents/TieredMenu'
import { Link } from 'react-router-dom'

const HomePage = () => {

  return (
    <>
      <div className='home'>
        <div className='home-menu'>  
        <PopupDemo></PopupDemo> 
            <Link to = {'/credits'}><img className="home-menu_buttonInfo" src={buttonInfo} alt="buttonInfo"/></Link>   
        </div>
        <div className='home-logo'>
            <img className="home-menu_logohome" src={logohome} alt="logohome" />   
        </div>
        <div className='home-buttons'>
            <div className='home-buttons_scan'>
            
            <Link to = {'/scan'}><button className="button-class1">
                <div><img src ={scanimg} alt="buttonScan"/></div>
                <div><p>Escanear</p></div>
                <div><p className='ocult'>Escanear</p></div>
              </button></Link>
              <p>Escanea un nuevo producto.</p>
            </div>
            <div className='home-buttons_scan'>
            
             <Link to = {'/gallery'}><button className="button-class2">
                <div><img src ={searchimg} alt="buttonSearch"/></div>
                <div><p>Productos</p></div>
                <div><p className='ocult'>Buscar</p></div>
              </button></Link>
              <p>Galeria de productos registrados.</p>
            </div>
            <div className='home-buttons_scan'>
            
            <Link to = {'/sos'}><button className="button-class3">
                <div><img src ={sos} alt="buttonSearch"/></div>
                <div><p>S.O.S</p></div>
                <div><p className='ocult'>S.O.S</p></div>
              </button></Link>
              <p>¿Necesitas ayuda urgente? Contactamos con emergencias.</p>
            </div>
        </div>
        
        <StaticMenu></StaticMenu>
      </div>


    </>
    
  )
}

export default HomePage



