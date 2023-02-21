import React, { useContext, useEffect, useState } from 'react';
import "./ProfileAlergicPage.scss";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import VolverComponent from '../../components/VolverComponent/VolverComponent';
import { API } from "../../shared/services/api";
import { JwtContext } from '../../shared/contexts/JwtContext';

const ProfileAlergicPage = () => {

  const { setUser, newUser } = useContext(JwtContext);

  const [components, setComponentes] = useState([]);
  const [arrayLetras, setArrayLetras] = useState([]);
  const [miClase, setMiClase] = useState('alergicPage__words__box--c--1');

  const navigate = useNavigate();

  let alergiasUser = [];
  let nameAlergias = [];

  // const claseSelected = 'selected';
  // const claseNotSelected = 'alergicPage__words__box--c--1';

  useEffect(() => {
    const getComponents = async () => {
      console.log("getting components");
      API.get('components').then(res => {
        setComponentes(res.data);
        cargarArrayLetras(res.data);
      })
    }
    getComponents();
  }, [])

  const cargarArrayLetras = (componentes) => {
    const primeraLetra = [...componentes];
    setComponentes(primeraLetra)
    const firstLetters = primeraLetra.map(str => str.name.charAt(0));
    setArrayLetras(firstLetters);
  }

  const guardar = () => {
    let completUser = {...newUser, intolerances: alergiasUser, nameIntolerances: nameAlergias};
    setUser(completUser);
    navigate('/profile/alergics/confirm');
  }

  const addIntolerance = (component) => {
    const foundItem = alergiasUser.find((item) => item === component._id);
      if (foundItem) {
        console.log('Elemento eliminado de alergias');
        alergiasUser = alergiasUser.filter((item) => item !== component._id);
        nameAlergias = nameAlergias.filter((item) => item._id !== component._id);
        console.log(alergiasUser);
        console.log(nameAlergias);
      } else {
        console.log('Elemento añadido a alergias');
        alergiasUser = [...alergiasUser, component._id];
        nameAlergias = [...nameAlergias, component];
        console.log(alergiasUser);
      }
  }

  const changeColor = (event) => {
    let contador = 0;
    console.log(contador);
    if (contador === 0) {
    event.target.className = 'selected';
    contador += contador;
    console.log(contador);
    }
    else {
    event.target.className = 'alergicPage__words__box--c--1';
    contador -= contador;
    console.log(contador);
    }
  }

  // const changeColorLetra = (color) => {
  //   color.target.className = 'selectedBtn';
  // };

  return (
    
    <div className='alergicPage'>
      <div className='alergicPage__header'>
        <VolverComponent ruta={'/profile/emergency'}></VolverComponent>
      </div>

      <div className='alergicPage__title'>
        <h2>Ahora selecciona tus alergias e intolerancias.</h2>
        <p>Los elementos marcados serán identificados en tus búsquedas como peligrosos para tí</p>
      </div>

      <div className='alergicPage__box'>
        {arrayLetras.map((letra, index) => {
          return arrayLetras.indexOf(letra) === index ? (<button key={index}>{letra}</button>) : null;
        })}
      </div>

      <div className='alergicPage__words'>
        <div className='alergicPage__words__box'>
          {arrayLetras.map((letra, index) => {
            return arrayLetras.indexOf(letra) === index ?
            ( <div key={index}>
              {/* onClick={() => changeColorLetra(color)} */}
                <button  className='alergicPage__words__box--letter'>{letra}</button>
                <div className='alergicPage__words__box--c'>
                  {components.map((component) => (
                  component.name[0] === letra &&  <button className={miClase} key={component._id} onClick={(event) =>{
                    addIntolerance(component)
                    changeColor(event)
                  }
                  } id={component.id}>{component.name}</button>
                  ))}
                </div>
              </div>
            ) : null; 
          })}
          
        </div>
      </div>

      <button onClick={guardar} className='alergicPage__btn'>Guardar</button>
    </div>
  )
}

export default ProfileAlergicPage