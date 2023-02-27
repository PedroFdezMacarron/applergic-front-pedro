import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VolverComponent from "../../components/VolverComponent/VolverComponent";
import { JwtContext } from "../../shared/contexts/JwtContext";
import start from "../../assets/HomeAssets/logostartmenu.png";
import diario from "../../assets/HomeAssets/logodiariomenu.png";
import share from "../../assets/HomeAssets/logosharemenu.png";
import signOk from "../../assets/ok.png";
import signKo from "../../assets/ko.png";
import signNd from "../../assets/nd.png";
import "./ScanResultPage.scss";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { API } from "../../shared/services/api";

const valoresPorDefecto = {
  _id: "63f34eabfb3892b2cfad604c",
  name: "PRODUCTO NO ENCONTRADO",
  brand: "NO ENCONTRADO",
  EAN: "1111111111",
  img: "https://img.freepik.com/vector-gratis/senal-roja-prohibida_1284-42862.jpg?w=2000",
  components: [],
};

const ScanResultPage = () => {
  const { barCode } = useContext(JwtContext);
  const { newUser, setUser } = useContext(JwtContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [productComponents, setProductComponents] = useState();
  const [result, setResult] = useState("ok");
  const [array2, setArray2] = useState(); // los componentes del producto
  const [intersection, setIntersection] = useState(); // la intersección de los componentes con las intolerancias

  let componentsTxt = "";
  let resultText = "";
  let resultClassName = "";
  let resultClassNameSign = "";
  let sign;

  // array de intolrancias del usuario lo cargamos en la variable array1
  const myObjectString = JSON.parse(localStorage.getItem("user"));
  const array1 = myObjectString.intolerances;
  console.log("array1 intolerancias", array1);

  // llama al get con el código de barras que recibe
  useEffect(() => {
    const getProduct = () => {
      try {
        console.log("get de:", barCode);
        API.get("products/" + barCode).then((res) => {
          // si encuentra el producto en la bbdd
          if (res.data) {
            // ponemos en la variable de estado product los datos del fetch (todos los datos del producto)
            const fproduct = res.data;
            setProduct(fproduct);
            console.log("fproduct", fproduct);

            // ponemos en la variable de estado array2 los datos del fetch (sólo los _id de los componentes)
            const array22 = fproduct.components.map((elem) => elem._id);
            console.log("array22 componentes del producto", array22);
            setArray2(array22);

            // pasar un array a un string para el DOM.
            componentesToString(res.data);

            // carga en intersection el cruce entre array1 y array22
            const array3 = array1.filter((element) =>
              array22.includes(element)
            );
            console.log("array3", array3);

            setIntersection(array3);

            if (array3.length > 0) {
              console.log("ko");
              setResult("ko"); // si hay elementos significa que no lo puedes tomar
            } else {
              console.log("ok");
              setResult("ok"); // si no hay elementos significa que si lo puedes tomar
            }
          } else {
            // si no lo encuentra, carga los datos por defecto.
            valoresPorDefecto.brand = "EAN:" + barCode;
            setProductComponents("");
            setProduct(valoresPorDefecto);
            setResult("nd"); // nd significa No Definido
          }
        });
      } catch (error) {
        setProduct(valoresPorDefecto);
        setResult("nd");
      }
    };
    getProduct();
  }, []);

  // para cargar en un texto el array de componentes
  const componentesToString = (fdata) => {
    let arrayComponents = fdata.components;
    arrayComponents.forEach((element) => {
      componentsTxt += element.name + ", ";
    });
    // console.log("product Components",componentsTxt );
    setProductComponents(componentsTxt);
  };

  // SE PUEDE TOMAR
  if (result === "ok") {
    resultText = "Este producto es apto para ti";
    resultClassName = "result__body--center--ok";
    resultClassNameSign = "signok";
    sign = signOk;
  }

  // NO SE PUEDE TOMAR
  if (result === "ko") {
    resultText = "Este producto NO es apto para ti, contiene:";
    product.components.forEach((element) => {
      if (element._id.includes(intersection)) {
        resultText += element.name + ", ";
      }
    });
    resultClassName = "result__body--center--ko";
    resultClassNameSign = "signko";
    sign = signKo;
  }

  // NO ESTÁ EN LA BBDD
  if (result === "nd") {
    resultText =
      "Lo sentimos, no hay datos suficientes para valorar este producto.";
    resultClassName = "result__body--center--nd";
    resultClassNameSign = "signnd";
    sign = signNd;
  }

  // guardar el producto en el diario del usuario.
  const saveDiaryProduct = () => {
    let completUser = JSON.parse(localStorage.getItem("user"));
    console.log("completuser", completUser);
    let arrayDiary = [...completUser.diaryProducts];
    const fecha = new Date();
    const fechaUTC = new Date(
      Date.UTC(
        fecha.getUTCFullYear(),
        fecha.getUTCMonth(),
        fecha.getUTCDate(),
        fecha.getUTCHours(),
        fecha.getUTCMinutes(),
        fecha.getUTCSeconds()
      )
    );

    arrayDiary = [...arrayDiary,{ _id: product._id, date: fechaUTC, notes: "sin notas" },];
    completUser = { ...completUser, diaryProducts: [...arrayDiary] };
    API.put("users/update", completUser).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(JSON.stringify(res.data));
      navigate("/diary");
    });
  };

  return (
    <div className="result">
      <div className="result__volver">
        <VolverComponent ruta={"/home"}></VolverComponent>
      </div>
      <div className="result__title">Aquí tienes el resultado.</div>
      <div className="result__subtitle">{resultText}</div>
      <div className="result__body">
        <div className="result__body--left"></div>
        <div className={resultClassName}>
          <img
            className="result__body--img"
            src={product?.img}
            alt="pic not found"
          ></img>
          <div className={resultClassNameSign}>
            <img className="icono" src={sign} alt="sign"></img>
          </div>
        </div>

        <div className="result__body--rigth">
          <Link to="/evaluate" className="result__body--link">
            <img className="result__body--ico" src={start} alt="home" />
          </Link>
          <img
            onClick={saveDiaryProduct}
            className="result__body--ico"
            src={diario}
            alt="save"
          />
          <Link to="/home" className="result__body--link">
            <img className="result__body--ico" src={share} alt="home" />
          </Link>
        </div>
      </div>

      <div className="result__name">{product?.name}</div>
      <div className="result__brand">{product?.brand}</div>
      <div className="result__components">
        <span className="result__components--bold">Ingredientes:</span>
        {productComponents}
      </div>
      <ButtonComponent
        ruta="/scan"
        name="Escanea otro producto"
      ></ButtonComponent>
    </div>
  );
};

export default ScanResultPage;
