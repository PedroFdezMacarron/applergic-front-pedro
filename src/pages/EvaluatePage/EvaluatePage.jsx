import React from 'react'
import { Link } from 'react-router-dom'
import VolverComponent from '../../components/VolverComponent/VolverComponent'
import LogoEvaluate from "../../assets/LogoEvaluate.png";
import "./EvaluatePage.scss";
import StarsComponent from '../../components/StarsComponent/StarsComponent';


const EvaluatePage = () => {
  return (
    <div className='evaluate-container'>
      <div className="volver-component">
        <VolverComponent  ruta={'/home'}></VolverComponent>
      </div>
        <div className="c-evaluate-padre">
          <div className="c-evaluate-padre__c-logo-hijo">
            <img className="c-evaluate-padre__c-logo-hijo__img-logo" src={LogoEvaluate} alt="img-logo"/>
          </div> 
         
          <div className="c-evaluate-padre__c-texto-hijo">
            <h3 className="c-evaluate-padre__c-texto-hijo__ppal">¡Gracias por usar Applergic!</h3>
            <h3 className="c-evaluate-padre__c-texto-hijo__texto">Por favor, evalua tu</h3>
            <h3 className="c-evaluate-padre__c-texto-hijo__texto">experiencia.</h3>
          </div>
        
          <div className="c-evaluate-padre__c-stars-hijo">
            <StarsComponent></StarsComponent>
          </div>

          <div className="c-evaluate-padre__link-hijo">
            <Link to="/home" className="nav-link">Enviar Sugerencias</Link>
          </div>
        
        </div>
    </div>

  )
}

export default EvaluatePage