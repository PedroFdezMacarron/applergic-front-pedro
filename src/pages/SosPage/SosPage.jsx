import React from 'react';
import './SosPage.scss';
import logosos from "../../assets/sos.jpg"
import VolverComponent from '../../components/VolverComponent/VolverComponent';
const SosPage = () => {

    let defContactName = "";
    let defContactEmail = "";
    let defContactPhone = "";
    let defInsuranceCompany = "";

    // cogemos los datos del usuario del localstorage
    const myObjectString = localStorage.getItem('user');    
    if(myObjectString){
        let userLoged = JSON.parse(myObjectString)
        
        defContactName = userLoged.contactName;
        defContactEmail = userLoged.contactEmail;
        defContactPhone = userLoged.contactPhone;
        defInsuranceCompany = userLoged.insuranceCompany;
      
    }



  return (
    <div className='sos'>
        <VolverComponent className='volver' ruta={'/home'}></VolverComponent>
        <img className="home-menu_logohome" src={logosos} alt="logohome" />   
        <h1 className='sos__title' >Ayuda urgente en camino</h1>
        <h2 className='sos__subtitle' >Estamos contactando con la persona registrada</h2>
        <div className='sos__form' > 
            <div className='sos__txt' id="name"><span>Contacto: </span>{defContactName}</div>   
            <div className='sos__txt' id="name"><span>Email-contacto: </span>{defContactEmail}</div>   
            <div className='sos__txt' id="name"><span>Telef-contacto: </span>{defContactPhone}</div>   
            <div className='sos__txt' id="name"><span>Compañía/Nº Póliza: </span>{defInsuranceCompany}</div>   
        </div>
    </div>

  )
}

export default SosPage