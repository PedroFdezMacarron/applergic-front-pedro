import React from "react";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";
import Onboarding1 from "../../assets/Onboarding1.png";
import Onboarding2 from "../../assets/Onboarding2.png";
import Onboarding3 from "../../assets/Onboarding3.png";
import Onboarding4 from "../../assets/Onboarding4.png";
import ApplergicTextoLogo from "../../assets/ApplergicTextoLogo.png";
import "./OnboardingPage.scss";
import InicioComponent from "../../components/InicioComponent/InicioComponent";
import { useState } from "react";

const OnboardingPage = () => {
  const paginas = [
    {
      img: Onboarding1,
      titulo: "Bienvenido a Applergic",
      description: "Escanea el codigo de barras de tu producto y Applergic te dirá si es apto para ti.",
    },
    {
      img: Onboarding2,
      description: "Lleva tu Diario de compras y actividades",
    },
    {
      img: Onboarding3,
      description: "En caso de emergencia nos pondremos en contacto con la persona que nos digas.",
    },
    {
      img: Onboarding4,
      description: "Viaja donde quieras. Tendrás a tu disposicion un traductor off-line y tu informe de alergias e intolerancias traducido al idioma local.",
    },
  ];
  
  const [intro, setIntro] = useState(true);

  setTimeout(() => {
    setIntro(false);
  }, 2000);

  const carouselTemplate = (pagina) => {
    return (
      <div className="onboarding">
        <div className="image-container">
          <img className="image-container__img-carousel" src={pagina.img} alt="imgOnboarding1"/>
        </div>

        <div className="text-container">
          <h4 className="text-container__texto">{pagina.titulo}</h4>
          <h4 className="text-container__texto">{pagina.description}</h4>
        </div>
      </div>
    );
  };
  const next = () =>{
    //acceder al boton del carousel
    const nextButton = document.querySelector(".p-carousel-next");
    nextButton.click();
    //console.log(nextButton);
  }
  return (
    <>
      {intro ? (
        <div className="container-inicio">
          <InicioComponent></InicioComponent>
        </div>
      ) : (
        <div className="container-main">
          <div className="container-main__imglogo">
            <img src={ApplergicTextoLogo} alt="ApplergicTextoLogo" className="img-logo-texto"/>
          </div>

          <Carousel value={paginas} numVisible={1} numScroll={1} itemTemplate={carouselTemplate}/>

          <div className="container-main__nav-container">
            <Link to="/login" className="nav-link">Saltar</Link>
            <button className="nav-container__nav-button" onClick={()=>next()}>Siguiente {'>'}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingPage;
