import React, { useRef } from 'react'; 
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
// import { Link } from "react-router-dom"
// import menuhamburguesa from "../../assets/HomeAssets/menuhamburguesa.png";
import "./TiredMenu.scss"
import { NavLink } from 'react-router-dom';





export default function PopupDemo() {
    const menu = useRef(null);
    const items = [
        
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
            url: '/profile'  
             
               
        },
        {
            label: 'Favorito',
            icon: 'pi pi-fw pi-pencil',
            url: '/login'
            
        },
        {
            label: 'Diario',
            icon: 'pi pi-fw pi-user',
            url: '/diary'
            
        },
        {
            label: 'Compartir',
            icon: 'pi pi-fw pi-calendar',
            url: '/login'
            
        },
        {
            label: 'Traductor',
            icon: 'pi pi-fw pi-power-off',
            url: '/login'
        },
        {
            label: 'Terminos',
            icon: 'pi pi-fw pi-calendar',
            url: '/login'
            
        },
        {
            label: 'Salir',
            icon: 'pi pi-fw pi-calendar',
            url: '/login'
        }

       
    ];

    return (
        <div className="card flex justify-content-center">
            <TieredMenu model={items} popup ref={menu}/>
            <Button className='buttom-menu' icon='pi pi-bars' onClick={(e) => menu.current.toggle(e)} />   
        </div>
    )
}
     


