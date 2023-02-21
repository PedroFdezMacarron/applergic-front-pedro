import React, { useContext, useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { useNavigate } from 'react-router-dom';
import { JwtContext } from "../../../shared/contexts/JwtContext";

export default function ScanCodePage() {
  const [data, setData] = useState("Not Found");
  const {setBarcode} = useContext(JwtContext);
  const navigate = useNavigate();

  return (
    <>
      <BarcodeScannerComponent
        onUpdate={(err, result) => {
          if (result){ 
            setData(result.text);
            setBarcode(result.text);
            navigate("/scan/result");
          } else setData("No se encuentra el producto");
        }}
      />
      <p className="scan-error">{data}</p>
    </>
  );
}
