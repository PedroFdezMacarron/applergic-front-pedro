import React from 'react';
import "./ProfileEndPage.scss";
import { Link } from "react-router-dom";
import VolverComponent from '../../components/VolverComponent/VolverComponent';
import CrossComponet from '../../components/CrossComponet/CrossComponent';
import perfect from '../../assets/alergics-finish.png';

const ProfileEndPage = () => {

  // const guardar = () => {
  //   API.post('users/register', newUser).then(res => {
  //   console.log('Register user',);
  //   navigate('/profile/end')
  //   })
  // }

  return (
    <div className='profileEnd'>
      <div className='profileEnd__header'>
        <VolverComponent ruta={'/profile/alergics/confirm'}></VolverComponent>
        <CrossComponet ruta={'/home'}></CrossComponet>
      </div>
      <div className='profileEnd__card'>
        <img src={perfect} alt='alergics-finish'></img>
        <h3>Hemos terminado, ya puedes escanear tu primer producto.</h3>
      </div>
      <button><Link to='/scan'>Escanea un producto</Link></button>
    </div>
  )
}

export default ProfileEndPage