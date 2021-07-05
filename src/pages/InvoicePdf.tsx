import React from "react";
import Pdf from "../components/Pdf";
import PdfInterface from "../interfaces/PdfInterface";

const PDF: React.FC = () => {

  let pdf = {} as PdfInterface;

  return (
    <Pdf {...pdf}></Pdf>
  );
};

export default PDF;
