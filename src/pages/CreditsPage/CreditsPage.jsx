
import React from 'react'
import "./CreditsPage.scss"
import logohome from "../../assets/HomeAssets/logohome.png"
import VolverComponent from '../../components/VolverComponent/VolverComponent'

const CreditsPage = () => {
  
  return (
    <>
      <div className='credits'>

      <div className='register__volver'>
            <VolverComponent ruta={'/home'}></VolverComponent>
      </div>
        
        <div className='home-logo'>
            <img className="home-menu_logohome" src={logohome} alt="logohome" />   
        </div>
        <div>
        <p className='title'>⭐️ Desarrollado por⭐️</p>
        <ul className='developers'>
            <li>
                Nerea Fernández
            </li>
            <li>
                Alba Mozas
            </li>
            <li>
                Marcos Fraile
            </li>
            <li>
                Pedro Fernández
            </li>
        </ul>

        </div>
        <br></br>
        <p className='title'>© Equipo 1 Upgrade Hub 2023</p>
        

      </div>


    </>
    
  )
}

export default CreditsPage