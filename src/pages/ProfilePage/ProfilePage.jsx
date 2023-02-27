

import userPhoto from "../../assets/Imagen_no_disponible.png";
import "./ProfilePage.scss";
import VolverComponent from '../../components/VolverComponent/VolverComponent';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {  
  const navigate = useNavigate();
  
  let defName = "";
  let defEmail = "";
  let defPhone = "";
  let defContactName = "";
  let defContactEmail = "";
  let defContactPhone = "";
  let defInsuranceCompany = "";
  

  // cogemos los datos del usuario del localstorage
  const myObjectString = localStorage.getItem('user');    
  if(myObjectString){
       let userLoged = JSON.parse(myObjectString)

        defName = userLoged.name;
        defEmail = userLoged.email;
        defPhone = userLoged.phone;
        defContactName = userLoged.contactName;
        defContactEmail = userLoged.contactEmail;
        defContactPhone = userLoged.contactPhone;
        defInsuranceCompany = userLoged.insuranceCompany;
        if(userLoged.photourl){userPhoto=userLoged.photourl};
  }
  
let photo='ok';

const editar =()=>{
  navigate('/users/update2');  
}

  return (

    <div className="profile">
    <div className='profile__volver'>
      <VolverComponent ruta={'/home'}></VolverComponent>
    </div>
    <div className='profile__title'>
       Perfil del usuario.
    </div>

  
    {photo==='ok' && 
       <img  className='profile__photo'  src={userPhoto} alt={photo} />
    }


  <div className='profile__body'>


    <div className='profile__form' > 

        <div className='profile__txt' id="name"><span>Nombre: </span>{defName}</div>
        <div className='profile__txt' id="name"><span>Email: </span>{defEmail}</div>
        <div className='profile__txt' id="name"><span>Teléfono: </span>{defPhone}</div>     
        <div className='profile__txt' id="name"><span>Contacto: </span>{defContactName}</div>   
        <div className='profile__txt' id="name"><span>Email-contacto: </span>{defContactEmail}</div>   
        <div className='profile__txt' id="name"><span>Telef-contacto: </span>{defContactPhone}</div>   
        <div className='profile__txt' id="name"><span>Compañía/Nº Póliza: </span>{defInsuranceCompany}</div>   
        
       
    </div>     
 


  </div>
  <button onClick={editar}>EDITAR</button>



</div>

    



  )
}

export default ProfilePage