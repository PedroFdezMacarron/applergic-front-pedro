import "./GalleryPage.scss";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { API } from "../../shared/services/api";
import home from "../../assets/HomeAssets/logohomemenu.png"
import CrossComponet from '../../components/CrossComponet/CrossComponent';

export default function GalleryPage() {
  const [products, setProducts] = useState([]);
  const [subtitle, setSubtite] = useState("Cargando productos de la web...");

  useEffect(() => {
    const getProducts = () => {
      API.get('products/populate').then(res => {
        setProducts(res.data);
        setSubtite(res.data.length+" productos recuperados.")
        })
    }
    getProducts();
  }, []);

  return(
    <div className="gallery">
      <div className='gallery__cross'>  
          {/* <CrossComponet ruta={'/home'}></CrossComponet> */}
          <Link to="/home"><img className='staticMenu-img' src ={home} alt="home"/></Link>
      </div>

      <div className='gallery__tittle'>
          <p className='gallery__tittle--bold'>Galería de productos</p>
          <p className='gallery__subtittle'>{subtitle}</p>
      </div>

      <div className='gallery__products'>
        {products.map((item, index) => (
          <div key={index} className="gallery__products__div">

            <div className='gallery__products__div--img'>
              <img className='gallery__products__div--img-1' src={item.img} alt={item.name}/>
            </div>

            <div className='gallery__products__div--card'>
              <h3 className='gallery__products__div--card--h3'>{item.name}</h3>
              <p className='gallery__products__div--card--p'><span>Marca: </span>{item.brand}</p>
              <p className='gallery__products__div--card--p'><span>EAN: </span>{item.EAN}</p>
              <br></br>
              <h4 className='gallery__products__div--card--h4'>Ingredientes:</h4>
              {item.components.map((component, i) => (
                <ul key={i}>
                  <li>{component.name}</li>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}