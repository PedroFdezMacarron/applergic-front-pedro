import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import VolverComponent from '../../components/VolverComponent/VolverComponent'
import { JwtContext } from '../../shared/contexts/JwtContext';
import start from "../../assets/HomeAssets/logostartmenu.png"
import diario from "../../assets/HomeAssets/logodiariomenu.png"
import share from "../../assets/HomeAssets/logosharemenu.png"
import signOk from "../../assets/ok.png";
import signKo from "../../assets/ko.png";
import signNd from "../../assets/nd.png";
import './ScanResultPage.scss';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { API } from '../../shared/services/api';

const valoresPorDefecto={"_id": "63f34eabfb3892b2cfad604c",
"name": "PRODUCTO NO ENCONTRADO",
"brand": "NO ENCONTRADO",
"EAN": "1111111111",
"img":"https://img.freepik.com/vector-gratis/senal-roja-prohibida_1284-42862.jpg?w=2000",
"components": []};

const ScanResultPage = () => {
  const { barCode } = useContext(JwtContext);
  const {newUser, setUser} = useContext(JwtContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [productComponents, setProductComponents] = useState();  
  const [result, setResult] = useState("ok");  
  let componentsTxt="";  
  let resultText='';
  let resultClassName='';
  let resultClassNameSign='';
  let sign;

  // llama al get con el código de barras que recibe
   useEffect(() => {
    const getProduct = () => {

      try {
        console.log("get del producto:",barCode);
        API.get('products/'+barCode).then(res=>{
          setProduct(res.data);
          if(res.data){
            console.log("res del producto:",res.data);        
            setDatos(res.data);
          }else{
            setProduct(valoresPorDefecto);    
            console.log("valores por defecto:",valoresPorDefecto);
            setResult('nd');     
          }
        })
        
      } catch (error) {
        setProduct(valoresPorDefecto);
        setResult('nd');  
      }
    }
    getProduct();
  }, []);
  
  // para cargar en un texto el array de componentes
  const setDatos=(fdata)=>{       
    let arrayComponents=fdata.components;
    arrayComponents.forEach(element => {
      componentsTxt += element.name+', ';
    });    
    console.log("product Components",componentsTxt );
    setProductComponents(componentsTxt);
  }


  if (result==='ok'){
    resultText= "Este producto es apto para ti";
    resultClassName= 'result__body--center--ok';
    resultClassNameSign='signok';
    sign = signOk;
  }
  if (result==='ko'){
    resultText= "Este producto NO es apto para ti, contiene uva.";
    resultClassName= 'result__body--center--ko';
    resultClassNameSign='signko';
    sign = signKo;
  }
  if (result==='nd'){
    resultText= "Lo sentimos, no hay datos suficientes para valorar este producto.";
    resultClassName= 'result__body--center--nd';
    resultClassNameSign='signnd';
    sign = signNd;
  }


  // guardar el producto en el dirario del usuario.
  const saveDiaryProduct=()=>{
    let completUser = JSON.parse(localStorage.getItem('user'));  
    console.log('completuser',completUser);
    let arrayDiary = [...completUser.diaryProducts];

    const fecha = new Date();
  const fechaUTC = new Date(Date.UTC(
  fecha.getUTCFullYear(),
  fecha.getUTCMonth(),
  fecha.getUTCDate(),
  fecha.getUTCHours(),
  fecha.getUTCMinutes(),
  fecha.getUTCSeconds()
));
    
    arrayDiary = [...arrayDiary,{_id: product._id, date:fechaUTC , notes:"sin notas"}];    
    completUser = {...completUser, diaryProducts:[...arrayDiary]};    
    API.put('users/update', completUser).then(res => {    
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(JSON.stringify(res.data));
      navigate('/diary');
    })

  }
  
  return (
    <div className='result'>                
        <div className='result__volver'>
            <VolverComponent ruta={'/home'}></VolverComponent>
        </div>       
        <div className='result__title'>
            Aquí tienes el resultado.
        </div>
        <div className='result__subtitle'>
            {resultText}
        </div>
        <div className='result__body'>
          <div className='result__body--left'> 
          </div>           
          <div className={resultClassName}>              
              <img className='result__body--img' src={product?.img} alt='pic not found'></img>
              <div className={resultClassNameSign}>
                  <img className="icono"  src={sign} alt="sign"></img>
              </div>
          </div>

          <div className='result__body--rigth'>             
                <Link to="/evaluate" className='result__body--link'  ><img className='result__body--ico' src ={start} alt="home"/></Link>
                <img onClick={saveDiaryProduct} className='result__body--ico'  src={diario} alt="save" />                
                <Link to="/home" className='result__body--link' ><img className='result__body--ico' src ={share} alt="home"/></Link>
          </div>
        </div>


        <div className='result__name'>
            {product?.name}
        </div>
        <div className='result__brand'>
            {product?.brand}
        </div>
        <div className='result__components'>
            <span className='result__components--bold'>Ingredientes:</span>{productComponents}
        </div>
        <ButtonComponent ruta='/scan' name='Escanea otro producto'></ButtonComponent>        

    </div>
  )
}

export default ScanResultPage