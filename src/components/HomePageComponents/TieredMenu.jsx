import React, { useRef, useState } from 'react'; 
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
// import { Link } from "react-router-dom"
// import menuhamburguesa from "../../assets/HomeAssets/menuhamburguesa.png";
import "./TiredMenu.scss"
import { useNavigate } from 'react-router';
// import { NavLink } from 'react-router-dom';





export default function PopupDemo() {
    const menu = useRef(null);
    const navigate=useNavigate();
    const [items, setItems] = useState([
        
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
            command: () => goTo('/profile'),
            // url: '/profile'  
             
               
        },
        {
            label: 'Favorito',
            icon: 'pi pi-fw pi-pencil',
            // url: '/login'
            
        },
        {
            label: 'Diario',
            icon: 'pi pi-fw pi-user',
            command: () => goTo('/diary'),
            // url: '/diary'
            
        },
        {
            label: 'Compartir',
            icon: 'pi pi-fw pi-calendar',
            // url: '/login'
            
        },
        {
            label: 'Traductor',
            icon: 'pi pi-fw pi-power-off',
            // url: '/login'
        },
        {
            label: 'Terminos',
            icon: 'pi pi-fw pi-calendar',
            // url: '/login'
            command: () => goTo('/credits'),
            
        },
        {
            label: 'Salir',
            icon: 'pi pi-fw pi-calendar',
            command: () => logOut(),
            // url: '/login'
        }

       
    ]);

    const logOut=()=>{
        localStorage.clear();
        navigate('/login');
    }

    const goTo = (path) => {       
        navigate(path);
      }

    const navigatef = (items) =>{
        console.log(items);
    }
    return (
        <div className="card flex justify-content-center">
            <TieredMenu model={items} popup ref={menu}/>
            <Button className='buttom-menu' icon='pi pi-bars' onClick={(e) => {menu.current.toggle(e); navigatef(e)}} />   
        </div>
    )
}
     


