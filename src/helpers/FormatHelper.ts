const FormatDate = (date: string) => {

  var formatted = '';
  var dateObject = new Date(date);

  formatted = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(dateObject);

  return formatted;
};

const FormatCurrency = (currency: number) => {

  var formatted = '';

  if (currency > 0) {
    formatted = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(currency);
  }

  return formatted;
};

export default { FormatDate, FormatCurrency };

