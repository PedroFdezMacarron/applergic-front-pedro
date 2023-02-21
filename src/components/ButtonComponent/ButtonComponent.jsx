import React from 'react';
import { Link } from 'react-router-dom';
import "./ButtonComponent.scss";

const ButtonComponent = ({ruta,name}) => {
  return (
    <div className='buttonComponent'>
      <Link to={ruta}><button className='buttonstyle'>{name}</button></Link>
    </div>
  )
}

export default ButtonComponent

// Para usarlo:
// <ButtonComponent ruta={'/home'} name={'Guardar'}></ButtonComponent>