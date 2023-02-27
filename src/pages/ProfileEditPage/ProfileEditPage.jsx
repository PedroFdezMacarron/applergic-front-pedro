import { useState, useContext } from "react";
import userPhoto from "../../assets/Imagen_no_disponible.png";
//import "./ProfilePage.scss";
import { JwtContext } from '../../shared/contexts/JwtContext';
import VolverComponent from '../../components/VolverComponent/VolverComponent';

const ProfileEditPage = () => {  
  const { newUserData } = useContext(JwtContext);
  console.log("recogemos los datos del usuario");
  //console.log(newUserData);
const actualUser = localStorage.getItem('user');
console.log(actualUser);
  actualUser.name=newUserData.name;
  newUserData = [...actualUser]
  // console.log(actualUser.name);
  // console.log(newUserData.name);
  actualUser.phone=newUserData.phone;
 
//   let defContactName = newUser.contactName;
//   //let defContactEmail = newUser.contactEmail;
//   let defContactPhone = newUser.contactPhone;
//   let defInsuranceCompany = newUser.insuranceCompany;

//   let defName = "";
//   let defEmail = "";
//   let defPhone = "";
//   let defContactEmail = "";
 


// const[data, setData] = useState();
// const submit = (e) => {
//     e.preventDefault();
//     console.log(data);
// };
// const changeData = (e) =>{
//   setData({...data,[e.target.name]:e.target.value})
// }


  return 

//     <div className="profile">
//     <div className='profile__volver'>
//       <VolverComponent ruta={'/home'}></VolverComponent>
//     </div>
//     <div className='profile__title'>
//        Editar perfil del usuario.
//     </div>

  
//     {photo==='ok' && 
//        <img  className='profile__photo'  src={userPhoto} alt={photo} />
//     }


//   <div className='profile__body'>


//     <div className='profile__form' > 
//         <form onSubmit={submit}>
//             <input className='profile__txt' name="defName" id="name" value={data.defName} onChange={changeData}><span>Nombre: </span>{defName}</input>
//             <input className='profile__txt' name="defEmail" id="name"><span>Email: </span>{defEmail}</input>
//             <input className='profile__txt' name="defPhone" id="name" value={data.defPhone} onChange={changeData}><span>Teléfono: </span>{defPhone}</input>     
//             <input className='profile__txt' name="defContactName" id="name" value={data.defContactName} onChange={(e)=>setData(e.target.value)}><span>Contacto: </span>{defContactName}</input>   
//             <input className='profile__txt' name="defContactEmail" id="name" value={data.defContactEmail} onChange={(e)=>setData(e.target.value)}><span>Email-contacto: </span>{defContactEmail}</input>   
//             <input className='profile__txt' name="defContactPhone" id="name" value={data.defContactPhone} onChange={(e)=>setData(e.target.value)}><span>Telef-contacto: </span>{defContactPhone}</input>   
//             <input className='profile__txt' name="defInsuranceCompany" id="name" value={data.defInsuranceCompany} onChange={(e)=>setData(e.target.value)}><span>Compañía/Nº Póliza: </span>{defInsuranceCompany}</input>   
//         </form>
       
//     </div>      


//   </div>



// </div>

    



  
}

export default ProfileEditPage