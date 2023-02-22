import "./GalleryPage.scss";
import { useEffect, useState} from "react";
import { API } from "../../shared/services/api";
import CrossComponet from '../../components/CrossComponet/CrossComponent';

export default function GalleryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      API.get('products/populate').then(res => {
        setProducts(res.data);
        })
    }
    getProducts();
  }, []);

  return(
    <div className="gallery">
      <div className='gallery__cross'>  
          <CrossComponet ruta={'/home'}></CrossComponet>
      </div>

      <div className='gallery__tittle'>
          <p className='gallery__tittle--bold'>Galería de productos</p>
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