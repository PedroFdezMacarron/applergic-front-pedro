import React from 'react';
import { Link } from 'react-router-dom';
import "./CrossComponent.scss";

const CrossComponet = ({ruta}) => {
  return (
      <Link className='crossComponent' to={ruta}>X</Link> 
  )
}

export default CrossComponet