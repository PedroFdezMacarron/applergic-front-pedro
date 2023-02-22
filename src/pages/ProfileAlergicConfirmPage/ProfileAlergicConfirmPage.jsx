import React, { useContext } from 'react'
import "./ProfileAlergicConfirmPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../shared/services/api";
import CrossComponet from '../../components/CrossComponet/CrossComponent';
import { JwtContext } from '../../shared/contexts/JwtContext';


const ProfileAlergicConfirmPage = () => {

  const { newUser, setJwt, setUser } = useContext(JwtContext);

  let alergiasUser = newUser.intolerances;
  
  console.log(newUser);
  console.log(alergiasUser);

  const navigate = useNavigate();

  const guardar = async () => {
    console.log('guardar usuario');
    await API.post('users/register', newUser).then(res => {
    console.log('Register user',);
    console.log("submit");
    })
      const formData = {

        email: newUser.email,
        password: newUser.password
      }
    await API.post('users/login', formData).then(res => {
        console.log(newUser);
        console.log(formData);
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setJwt(true);
        setUser(JSON.stringify(res.data.user));
        navigate('/profile/end')
    })
  }
  

  return (
    <div className='alergicConfirm'>

      <div className='alergicConfirm__out'>
        <CrossComponet ruta={'/login'}></CrossComponet>
      </div>

      <div className='alergicConfirm__title'>
        <h2>Confirma tu selección</h2>
        <p>A continuación te resumimos los alimentos registrados como peligrosos para ti</p>
      </div>

      <div className='alergicConfirm__alergics'>

        <p className='alergicConfirm__alergics--p1'>Marcar para deseleccionar</p>
        <p className='alergicConfirm__alergics--p2'>o añadir uno nuevo</p>

        <div className='alergicConfirm__alergics--specific'>
          {newUser.nameIntolerances.map((intolerancias, index) => (
            <button className='alergicConfirm__alergics--specific--alergics' key={index}>{intolerancias.name}</button>
          ))}
        </div>

        <button className='alergicConfirm__alergics--btn'><Link to='/profile/alergics'>Añadir nuevos</Link></button>

      </div>

      <button onClick={guardar} className='alergicConfirm__btn'>CONFIRMAR</button>
    </div>
  )
}

export default ProfileAlergicConfirmPage