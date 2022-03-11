import jspdf from "jspdf";
import domtoimage from "dom-to-image";
import CalendarColors from "../interfaces/CalendarColors";

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

const FormatDateCalendar = (date: string) => {
  let formatted = "";
  let dateObject = undefined;

  if (date) {
    dateObject = new Date(date);
  } else {
    dateObject = new Date();
  }

  let dayDate = dateObject.getDate();
  let monthDate = dateObject.getMonth() + 1;

  let day = dayDate < 10 ? "0" + dayDate : dayDate;
  let month = monthDate < 10 ? "0" + monthDate : monthDate;
  let year = dateObject.getFullYear();

  formatted = day + '-' + month + '-' + year;

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

  document.getElementById("page")!.style.marginLeft = '0';

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
};


const GetRandomColor = () => {
   let values = Object.keys(CalendarColors); 
   let enumKey = values[Math.floor(Math.random() * values.length)]; 

   return CalendarColors[enumKey];
}

export default {
  FormatDate,
  FormatDatePdf,
  FormatDateCalendar,
  FormatCurrency,
  FormatZero,
  PrintInvoiceTitle,
  RoundNumber,
  GeneratePDF,
  GetRandomColor
};
