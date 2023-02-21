import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { JwtContext } from '../../shared/contexts/JwtContext';
import { API } from "../../shared/services/api";
import loginimg from "../../assets/loginimg.png";
import logoytexto from "../../assets/logoytexto.png";
import "./LoginPage.scss";
import { Link, useNavigate } from 'react-router-dom';
import { BtnBlue } from '../../components/BtnComponent/BtnComponent';

export default function LoginPage () {
    const { register, handleSubmit } = useForm();
    const { setJwt,setUser } = useContext(JwtContext);
    const navigate = useNavigate();

    const onSubmit = formData => {
        console.log("submit",formData);
        API.post('users/login', formData).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setJwt(true);
            setUser(JSON.stringify(res.data.user));
            navigate('/home');
        })
    }

    return (
      <div className="login">
        <div className='login__header'>
          <img className='login__img'  src={loginimg} alt="img"/>
          <img className='login__imglogo'  src={logoytexto} alt="img"/>
        </div>
        <div className='login__body'>
          <div className='login__title'>
              !Bienvenido de nuevo!
          </div>
          <div className='login__subtitle'>
              Por favor, introduce tus datos para continuar.
          </div>

          <form className='login__form' onSubmit={handleSubmit(onSubmit)}>                        
              <input className='login__txt' id="email" 
                      placeholder='Dirección e.mail' 
                      // defaultValue="pedro@pedro.com"
                      {...register("email",{required: true})}/>
          
              <input className='login__txt' id="password"  
                    placeholder='Password' 
                    type="password" 
                    // defaultValue={'Pedro*1'}
                    {...register("password",{required: true})}/>
              <div className='login__blue'>
                ¿Olvidaste la contaseña
              </div>
              <BtnBlue showText='Entrar'></BtnBlue>
              {/* <input className='login__btn'  type="submit" value="Entrar"/> */}
          </form>


        </div>

          <div className='login__new'>
              ¿nuevo en Applergic?
          </div>
          <div className='login__new-link'>
              <Link className='login__new-link' to="/register">
                  Crea tu cuenta aquí
              </Link>                
          </div>
          <div className='login__blue'>
             Me registraré en otro momento
          </div>


      </div>
    )
}
