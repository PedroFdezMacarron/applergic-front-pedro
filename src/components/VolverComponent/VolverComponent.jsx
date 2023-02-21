import React from 'react';
import { Link } from 'react-router-dom';
import volver from "../../assets/volver.png";
import "./VolverComponent.scss";

const VolverComponent = ({ruta}) => {
  return (
    <div className='volverComponent'>
      <Link to={ruta}><img src={volver} alt='volver'></img></Link>
    </div>
  )
}

export default VolverComponent