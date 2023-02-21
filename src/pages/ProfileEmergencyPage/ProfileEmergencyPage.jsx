import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import "./ProfileEmergencyPage.scss";
import { useNavigate } from 'react-router-dom';
import { JwtContext } from '../../shared/contexts/JwtContext';
import VolverComponent from '../../components/VolverComponent/VolverComponent';
import { BtnGrey } from '../../components/BtnComponent/BtnComponent';
import { API } from "../../shared/services/api";

export default function ProfileEmergencyPage () {
    const { register, handleSubmit } = useForm();    
    const { setUser, newUser } = useContext(JwtContext);
    console.log("recogemos los datos del usuario");
    console.log(newUser);
    const navigate = useNavigate();

    // recargamos formulario con datos por defecto.
    // si ya estamos logeados entonces cargamos con los datos del usuario loogeado
    let defContactName = newUser.contactName;
    let defContactEmail = newUser.contactEmail;
    let defContactPhone = newUser.contactPhone;
    let defInsuranceCompany = newUser.insuranceCompany;

    // recogemos valor de la variable de localstorage
    const myObjectString = localStorage.getItem('user');
    if(myObjectString){
         let userLoged = JSON.parse(myObjectString)
         defContactName = userLoged.contactName;
         defContactEmail = userLoged.contactEmail;
         defContactPhone = userLoged.contactPhone;
         defInsuranceCompany = userLoged.insuranceCompany;
    }


    const onSubmit = formData => {        
        let completUser = {...newUser,...formData,"photourl":"https://avatars.githubusercontent.com/u/117455326?s=400&u=aa6acaed286d86bc4fbfb37a2b1a0095f480f4d1&v=4"};
        // let completUser = {...newUser,alergiasUser};
        setUser(completUser);
        console.log("datos completos del usuario");        
        console.log(newUser);
        // registramos el usuario. está comentado porque esto se hace en la siguiente pantalla
        //   API.post('users/register', completUser).then(res => {
        //     console.log('Register user',);        
        // })
        navigate('/profile/alergics');     
    }

    return (
      <div className="profileEmergency">
          
        <div className='profileEmergency__header'>
          <div className='profileEmergency__volver'>
              <VolverComponent ruta={'/register'}></VolverComponent>
          </div>
          <div className='profileEmergency__title'>
            Vamos a añadir tu contacto en caso de emergencia.
          </div>
          <div className='profileEmergency__subtitle'>
            Nos pondremos en contacto con tu persona de confianza y/o compañía de seguros en caso de emergencia.  
          </div>
        </div>

        <div className='profileEmergency__body'>        

          <form className='profileEmergency__form' onSubmit={handleSubmit(onSubmit)}>                        

              <input className='profileEmergency__txt' id="contactName" 
                      placeholder='Nombre completo de tu contacto' defaultValue={defContactName}                      
                      {...register("contactName",{required: true})}/>

              <input className='profileEmergency__txt' id="contactEmail" 
                      placeholder='Dirección e.mail'     defaultValue={defContactEmail}                  
                      {...register("contactEmail",{required: true})}/>

              <input className='profileEmergency__txt' id="contactPhone" 
                      placeholder='Móvil'                defaultValue={defContactPhone}       
                      {...register("contactPhone",{required: true})}/>
          
          <input className='profileEmergency__txt' id="insuranceCompany" 
                      placeholder='Compañía de seguros/Nº Póliza'   defaultValue={defInsuranceCompany}                    
                      {...register("insuranceCompany",{required: true})}/>
              
              <BtnGrey showText='Guardar emergencias'></BtnGrey>
              {/* <input className='profileEmergency__btn'  type="submit" value="Guardar emergencias"/> */}
          </form>      
          <div className='profileEmergency__blue'>
             Me registraré en otro momento
          </div>   

        </div>




      </div>
    )
}