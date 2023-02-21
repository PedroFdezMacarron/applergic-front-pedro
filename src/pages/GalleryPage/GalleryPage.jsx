import "./GalleryPage.scss";
// import { Link } from "react-router-dom"
import { useContext, useEffect, useState} from "react"
import { JwtContext } from "../../shared/contexts/JwtContext"
import { API } from "../../shared/services/api"
import calendar from "../../assets/calendario.png"
import filter from "../../assets/filter.png"
import edit from "../../assets/edit.png"
import CrossComponet from '../../components/CrossComponet/CrossComponent'
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'


export default function GalleryPage() {
  const [products, setProducts] = useState([]);
  // //
  // const [editing, setEditing] = useState(false);
  // const [editNotes, setEditNotes] = useState('');
  // //
  const {newUser, setUser} = useContext(JwtContext);
  // console.log("nuevousauario", JSON.parse(newUser));

  useEffect(() => {
    const getProducts = () => {
      API.get('products/populate').then(res => {
        setProducts(res.data);

        })
    }
    getProducts();
  }, []);

  return(
      <>
      <div className="app-prueba">
        <div className='editDiary'>
            <CrossComponet ruta={'/home'}></CrossComponet>
        </div>
        <div className='tittle'>
           <p className='tittle-Bold'>Galería de productos</p>
        </div>
        <div className='products'>
          {products.map((item, index) => (
            <div className="products__div">
            <div  key={index} className='products__div-container'>
              <img className='products-img' src={item.img} alt={item.name}/>
            </div>

            <div className='products__div-container_dates'>
              <h3 className="dates">{item.name}</h3>
              <p>Marca: {item.brand}</p>
              <p>EAN: {item.EAN}</p>
              <br></br>
              <h4>Ingredientes:</h4>
              {item.components.map((component, index) => (
                <ul key={index}>
                  <li>{component.name}</li>
                </ul>
              ))}
            </div>
            </div>
          ))}
        </div>
        </div>
      </>
  )
}