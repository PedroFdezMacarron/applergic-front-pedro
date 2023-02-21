//import React from 'react';
import InicioImagen from "../../assets/InicioImagen.png";
import ApplergicPpal from "../../assets/ApplergicPpal.png";



const InicioComponent = () => {
  

  return (
    
    <div className='container-flash'>
      <div className="inicioImagen">
        <img className="inicioImagen__imagen" src={ApplergicPpal} alt="ApplergicPpal"/>
      </div>

      <div className="applergicPpal">
        <img className="applergicPpal__image" src={InicioImagen} alt="InicioImagen"/>
      </div>
      </div>
  
  )
}

export default InicioComponent
