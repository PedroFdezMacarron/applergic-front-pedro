import "./DiaryPage.scss"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState} from "react"
import { JwtContext } from "../../shared/contexts/JwtContext"
import { API } from "../../shared/services/api"
import calendar from "../../assets/calendario.png"
import filter from "../../assets/filter.png"
import edit from "../../assets/edit.png"
import CrossComponet from '../../components/CrossComponet/CrossComponent'
import tick from "../../assets/ok.png"



export default function DiaryPage() {
  const [products, setProducts] = useState([]);

  const {newUser, setUser} = useContext(JwtContext);

  useEffect(() => {
    const getProducts = () => {
      API.post('products/user', JSON.parse(newUser)).then(res => {
        let myUser = JSON.parse(newUser);
        let arrayNuevo = res.data;
        const updatedArray = arrayNuevo.map((item) => {
          const product = myUser.diaryProducts.find((p) => p._id === item._id);
          console.log("product",product);
          return {
            ...item,
            fecha: product.date,
            notas: product.notes,
          };
        });

        setProducts(updatedArray);
        // console.log(updatedArray);
        })
    }
    getProducts();
  }, [newUser]);


  // Formatear la fecha
  const formatDate = (myDate) =>{
    const date = new Date(myDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('es-ES', options);

    return formattedDate;
  } 

  // Eliminar el producto del array
  const deleteProduct = (productId) => {
    const newProducts = products.filter((product) => product._id !== productId);
    setProducts(newProducts);
  }

  // Guardar los productos del usuario
  const saveDiary = () => {
    let completUser = JSON.parse(newUser);
    // console.log("completeUser",completUser);
    const myProducts = products.map((product)=>({_id: product._id, date:product.fecha, notes:product.notas}))
    completUser = {...completUser, diaryProducts:[...myProducts]};
    API.put('users/update', completUser).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(JSON.stringify(res.data));
    })
  }

  return(
      <><div className="app-prueba">
        <div className='editDiary'>
            <img className='editDiary-png' src ={calendar} alt="calendar"/>
            <Link to="/scan"><img className='editDiary-png' src ={filter} alt="filter"/></Link>
            <CrossComponet ruta={'/home'}></CrossComponet>
        </div>
        <div className='tittle'>
           <p className='tittle-Bold'>¿Incluimos la <br></br> selección en tu <br></br> Diario? </p>
           <p className='tittle-info'>Añade tus comentarios para <br></br> completar la información.</p>
        </div>


       {products.map((item,index) => (
        <div className='theproducts' key={index}>
            <div className='theproducts-container'>
              <img className='theproducts-img' src={item.img} alt="" />
              <img className='theproducts-tick' src ={tick} alt="filter"/>
            </div>

            <div className='theproducts-container_dates'>
              <p className="dates">{formatDate(item.fecha)}</p>
              <figcaption className="dates">{item.name}</figcaption>
              <p className="dates">Notas:{item.notas}</p>
            </div>
            <div className='theproducts-container_cross'>
              <button className="btnFuntion" onClick={() => deleteProduct(item._id)}><CrossComponet></CrossComponet></button>
              <button className='editDiary-png'><img className="pencil" src={edit} alt="edit" /></button>
            </div>
        </div>
    ))}
        <div className='btndiv'>
           <div className='btncomponent'>
              <button className='btncomponent-save' onClick={() => saveDiary()}>Guardar</button>
              <button className="btncomponent-informe" ruta={''}>Generar informe</button>
           </div>
        </div>
        </div>
      </>

  )
}
