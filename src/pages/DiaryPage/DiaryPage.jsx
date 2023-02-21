import "./DiaryPage.scss"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState} from "react"
import { JwtContext } from "../../shared/contexts/JwtContext"
import { API } from "../../shared/services/api"
import calendar from "../../assets/calendario.png"
import filter from "../../assets/filter.png"
import edit from "../../assets/edit.png"
import CrossComponet from '../../components/CrossComponet/CrossComponent'
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'


export default function DiaryPage() {
  const [products, setProducts] = useState([]);
  const {newUser, setUser} = useContext(JwtContext);
  // console.log("nuevousauario", JSON.parse(newUser));

  useEffect(() => {
    const getProducts = () => {
      API.post('products/user', JSON.parse(newUser)).then(res => {
        // console.log("JSONnewUser", JSON.parse(newUser));
        // console.log("res", res);
        // console.log("res.dat", res.data);
        let myUser = JSON.parse(newUser);
        // console.log("usuario",myUser);
        let arrayNuevo = res.data;
        //esto es un array de objetos con los alimentos (res.data)
        // console.log("mostrando red.data", res.data);
        const updatedArray = arrayNuevo.map((item) => {
          // console.log(myUser.diaryProducts);
          const product = myUser.diaryProducts.find((p) => p._id === item._id);
          console.log("product",product);
          //Product tiene las notas del producto y la fecha
          // const date = new Date(product.date);
          // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
          // const formattedDate = date.toLocaleDateString('es-ES', options);
          return {
            ...item,
            fecha: product.date,
            notas: product.notes,
          };
        });

        setProducts(updatedArray);
        console.log(updatedArray);
        })
    }
    getProducts();
  }, [newUser]);

  const formatDate = (myDate) =>{
    const date = new Date(myDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('es-ES', options);

    return formattedDate
  } 

  // Función para eliminar un producto del array
  const deleteProduct = (productId) => {
    const newProducts = products.filter((product) => product._id !== productId);
    setProducts(newProducts);
    console.log(products);

  }

  //Función para guardar los productos del usuario
  const saveDiary = () => {
    let completUser = JSON.parse(newUser);
    console.log("completeUser",completUser);
    const myProducts = products.map((product)=>({_id: product._id, date:product.fecha, notes:product.notas}))
    //esto de abajo guardaba sólo el alimento pero se cargaba el diario del Producto pero no guardar realmente los cambios
    completUser = {...completUser, diaryProducts:[...myProducts]};
    // console.log("completeUser",JSON.parse(completUser));
    // console.log(JSON.parse(newUser));
    API.put('users/update', completUser).then(res => {
      // console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(JSON.stringify(res.data));
    })
  }

  // const saveDiary = () => {
  //   let completUser = JSON.parse(newUser);
  //   completUser = {
  //     ...completUser,
  //     diaryProducts: {
  //       ...completUser.diaryProducts,
  //       [new Date().toDateString()]: {
  //         products: products,
  //         notes: "Escribe aquí tus notas"
  //       }
  //     }
  //   };
  //   API.put('users/update', completUser).then(res => {
  //     localStorage.setItem('user', JSON.stringify(res.data));
  //     setUser(JSON.stringify(res.data));
  //   });
  // }

  

  return(
      <><div className="app-prueba">
        <div className='editDiary'>
            <img className='editDiary-png' src ={calendar} alt="calendar"/>
            <img className='editDiary-png' src ={filter} alt="filter"/>
            <CrossComponet ruta={'/home'}></CrossComponet>
        </div>
        <div className='tittle'>
           <p className='tittle-Bold'>¿Incluimos la <br></br> selección en tu <br></br> diario? </p>
           <p className='tittle-info'>Añade tus comentarios para <br></br> completar la información</p>
        </div>


       {products.map((item,index) => (
        <div className='products' key={index}>
            <div className='products-container'>
              <img className='products-img' src={item.img} alt="" /></div>
            <div className='products-container_dates'>
              <p className="dates">{formatDate(item.fecha)}</p>
              <figcaption className="dates">{item.name}</figcaption>
              <p className="dates">Notas:{item.notas}</p>
            </div>
            <div className='products-container_cross'>
            {/* Botón para eliminar el producto */}
            <button className="btnFuntion" onClick={() => deleteProduct(item._id)}><CrossComponet></CrossComponet></button>
              {/* <CrossComponet></CrossComponet> */}
              <Link to="/diary"><img className='editDiary-png' src ={edit} alt="edit"/></Link>
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
