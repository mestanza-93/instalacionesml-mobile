import path from "path";
import jspdf from "jspdf";
import domtoimage from "dom-to-image";
import { PDFGenerator } from "@ionic-native/pdf-generator";


const FormatDate = (date: string) => {
  let formatted = "";
  let dateObject = undefined;

  if (date) {
    dateObject = new Date(date);
  } else {
    dateObject = new Date();
  }

  formatted = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(dateObject);

  return formatted;
};

const FormatDatePdf = (date: string) => {
  let formatted = "";
  let dateObject = undefined;

  if (date) {
    dateObject = new Date(date);
  } else {
    dateObject = new Date();
  }

  formatted = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObject);

  return formatted;
};

const FormatCurrency = (currency: number) => {
  let formatted = "";

  if (currency > 0) {
    formatted = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(currency);
  }

  return formatted;
};

const FormatZero = (num: number, places: number = 4) => {
  return String(num).padStart(places, "0");
};

const PrintInvoiceTitle = (year: number, id: number) => {
  return year && id ? year + "-" + FormatZero(id) : FormatZero(id);
};

const RoundNumber = (num: number, decimals: number) => {
  return parseFloat(num.toFixed(decimals));
};

const GeneratePDF = (type: string, id: string) => {
  let year = new Date().getFullYear();
  let pdfName = type + " " + year + "-" + id + ".pdf";

  if (process.env.NODE_ENV == 'development') {
    domtoimage
      .toPng(document.getElementById("page")!)
      .then(function (blob: any) {
        var createPdf = new jspdf("p", "mm", "a4");
        var width = createPdf.internal.pageSize.getWidth();
        var height = createPdf.internal.pageSize.getHeight();

        createPdf.addImage(blob, "PNG", 0, 0, width, height, "test", "MEDIUM", 0);
        createPdf.save(pdfName);

        document.getElementById("page")?.setAttribute("hidden", "true");
      })
      .catch(function (error: any) {
        console.error("oops, something went wrong!", error);
      });
  } else {
    
    let divToPrint = document.getElementById("page")!.innerHTML;

    divToPrint += `
      <style>
        .card-page {  
          background: white;
          display: block;
          margin: 0 auto;
          margin-bottom: 0.5cm;
          box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
          width: 21cm;
          height: 29.7cm; 
        }
        
        .text-center {
          text-align: center;
        }
        
        .text-right {
          text-align: right;
        }
        
        .text-left {
          text-align: left;
        }
        
        .align-middle {
          vertical-align: middle;
        }
        
        .mx-0 {
          margin-left: 0;
          margin-right: 0;
        }
        .mx-1 {
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
        .mx-2 {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
        .mx-3 {
          margin-left: 1rem;
          margin-right: 1rem;
        }
        .mx-4 {
          margin-left: 1.5rem;
          margin-right: 1.5rem;
        }
        .mx-5 {
          margin-left: 3rem;
          margin-right: 3rem;
        }
        .my-0 {
          margin-top: 0;
          margin-bottom: 0;
        }
        .my-1 {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .my-2 {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .my-3 {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .my-4 {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .my-5 {
          margin-top: 3rem;
          margin-bottom: 3rem;
        }
        .ml-5 {
          margin-left: 3rem;
        }
        .mr-5 {
          margin-left: 3rem;
        }
        .px-1 {
          padding-right: 0.25rem;
          padding-left: 0.25rem;
        }
        .py-1 {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }
        .pb-0 {
          padding-bottom: 0%;
        }
        
        .border-0 {
          border: 0 !important;
        }
        
        .w100 {
          width: 100%;
        }
        .w85 {
          width: 85%;
        }
        .w65 {
          width: 65%;
        }
        .w35 {
          width: 35%;
        }
        .w34 {
          width: 34%;
        }
        .w15 {
          width: 15%;
        }
        .w12 {
          width: 12%;
        }
        .w10 {
          width: 10%;
        }
        
        .card {
          position: relative;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-color: #fff;
          background-clip: border-box;
          border: 1px solid rgba(0, 0, 0, 0.125);
          border-radius: 0.25rem;
        }
        
        .card > hr {
          margin-right: 0;
          margin-left: 0;
        }
        
        .card > .list-group {
          border-top: inherit;
          border-bottom: inherit;
        }
        
        .card > .list-group:first-child {
          border-top-width: 0;
          border-top-left-radius: calc(0.25rem - 1px);
          border-top-right-radius: calc(0.25rem - 1px);
        }
        
        .card > .list-group:last-child {
          border-bottom-width: 0;
          border-bottom-right-radius: calc(0.25rem - 1px);
          border-bottom-left-radius: calc(0.25rem - 1px);
        }
        
        .card > .card-header + .list-group,
        .card > .list-group + .card-footer {
          border-top: 0;
        }
        
        .card-body {
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
          min-height: 1px;
          padding: 1.25rem;
        }
        
        .card-title {
          margin-bottom: 0.75rem;
        }
        
        .card-subtitle {
          margin-top: -0.375rem;
          margin-bottom: 0;
        }
        
        .card-text:last-child {
          margin-bottom: 0;
        }
        
        .card-link:hover {
          text-decoration: none;
        }
        
        .card-link + .card-link {
          margin-left: 1.25rem;
        }
        
        .card-header {
          padding: 0.75rem 1.25rem;
          margin-bottom: 0;
          background-color: rgba(0, 0, 0, 0.03);
          border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        }
        
        .card-header:first-child {
          border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
        }
        
        .card-footer {
          padding: 0.75rem 1.25rem;
          background-color: rgba(0, 0, 0, 0.03);
          border-top: 1px solid rgba(0, 0, 0, 0.125);
        }
        
        .card-footer:last-child {
          border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
        }
        
        .card-header-tabs {
          margin-right: -0.625rem;
          margin-bottom: -0.75rem;
          margin-left: -0.625rem;
          border-bottom: 0;
        }
        
        .card-header-pills {
          margin-right: -0.625rem;
          margin-left: -0.625rem;
        }
        
        .card-img-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 1.25rem;
          border-radius: calc(0.25rem - 1px);
        }
        
        .card-img,
        .card-img-top,
        .card-img-bottom {
          -ms-flex-negative: 0;
          flex-shrink: 0;
          width: 100%;
        }
        
        .card-img,
        .card-img-top {
          border-top-left-radius: calc(0.25rem - 1px);
          border-top-right-radius: calc(0.25rem - 1px);
        }
        
        .card-img,
        .card-img-bottom {
          border-bottom-right-radius: calc(0.25rem - 1px);
          border-bottom-left-radius: calc(0.25rem - 1px);
        }
        
        .basic {
          font-family: "Arial";
          font-size: 12px;
        }
        
        .invoice-title {
          font-size: 30px;
        }
        
        .budget-title {
          font-size: 30px;
        }
        
        .bigtext {
          font-size: 18px;
        }
        
        .medium-text {
          font-size: 14px;
        }
        
        .small-text {
          font-size: 10px;
        }
        
        .bold {
          font-weight: bold;
        }
        
        .normal {
          font-weight: normal;
        }
        
        .borderless td,
        .borderless th {
          border: none;
        }
        
        .table-customer {
          border: 1px solid black;
        }
        
        .card-head {
          margin-left: 20px;
        }
        
        .card-footer {
          position: absolute;
          bottom: 0;
        }
        
        table.table-bordered > thead > tr > th {
          border: 1px solid black;
        }
        
        table.table-bordered > tbody > tr > td {
          border: 1px solid black;
        }
        
        th {
          background-color: #d3d3d3;
        }
        
      </style>
    `;

    let assetsPath = path.join(__dirname + "/../public/");
    assetsPath = assetsPath.replace(new RegExp(/\\/g), '/');

    let options = {
      documentSize: "A4",
      type: "share",
      fileName: pdfName,
      baseUrl: 'file:///' + assetsPath
    };
      
    PDFGenerator.fromData(divToPrint, options);

    document.getElementById("page")?.setAttribute("hidden", "true");
  }

};

export default {
  FormatDate,
  FormatDatePdf,
  FormatCurrency,
  FormatZero,
  PrintInvoiceTitle,
  RoundNumber,
  GeneratePDF,
};
