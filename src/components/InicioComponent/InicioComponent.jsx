//import React from 'react';
import InicioImagen from "../../assets/InicioImagen.png";
import ApplergicPpal from "../../assets/ApplergicPpal.png";



const InicioComponent = () => {
  

  return (
    
    <div className='container-flash'>
  
        <img className="inicioImagen__imagen" src={ApplergicPpal} alt="ApplergicPpal"/> 

     
        <img className="applergicPpal__image" src={InicioImagen} alt="InicioImagen"/>
   
      </div>
  
  )
}

export default InicioComponent
