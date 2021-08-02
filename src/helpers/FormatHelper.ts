import jspdf from "jspdf";

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
  const domtoimage = require("dom-to-image");

  domtoimage
    .toPng(document.getElementById("page"))
    .then(function (blob: any) {
      var createPdf = new jspdf("p", "mm", "a4");
      var width = createPdf.internal.pageSize.getWidth();
      var height = createPdf.internal.pageSize.getHeight();

      createPdf.addImage(blob, "PNG", 0, 0, width, height, "test", "MEDIUM", 0);

      let pdfName = type + " " + year + "-" + id + ".pdf";

      if (process.env.NODE_ENV == 'development') {
        createPdf.save(pdfName);
      } else {
        let pdfBlob = createPdf.output();
        window.open(URL.createObjectURL(pdfBlob));
      }
      
      document.getElementById('page')?.setAttribute('hidden', 'true');
    })
    .catch(function (error: any) {
      console.error("oops, something went wrong!", error);
    });
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
