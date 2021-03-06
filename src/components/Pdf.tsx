import React from "react";
import PdfInterface from "../interfaces/Pdf";
import FormatHelper from "../helpers/FormatHelper";
import "../theme/pdf.css";

const Pdf: React.FC<PdfInterface> = (props) => {

  let user = props.user ?? {};
  var data = props.type == "budget" ? props.budget : props.invoice;
  let work = props.work ?? {};
  let customer = props.customer ?? {};

  let payment = 'Efectivo';

  if (props.type == 'invoice' && props.invoice) {
    if (props.invoice.payment == 2) {
      payment = 'Transferencia';
    }
  }

  let labels = {
    title: { invoice: "FACTURA", budget: "PRESUPUESTO" },
    number: { invoice: "factura", budget: "presupuesto" },
  };

  if (data) {
    return (
      <div className="card card-default card-page" id="page" hidden={true}>
        <div className="card-body">
          <div className="card card-default border-0 mx-2 my-0">
            <div className="card-body">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/invoice_logo.jpeg"}
                alt="Instalaciones ML"
                width="160"
                height="90"
              />
              <table className="table table-borderless 100">
                <tbody>
                  <tr>
                    <td
                      className="basic bigtext bold pb-0 w85"
                      id="user-fullname"
                    >
                      {user.name} {user.lastname}
                    </td>
                    <td className="basic bigtext bold pb-0 w15" id="today">
                      {FormatHelper.FormatDatePdf(work.date ?? "")}
                    </td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-address">
                      {user.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-town">
                      {user.town}
                    </td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-postal-code">
                      {user.postalcode}
                    </td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-dni">
                      {user.dni}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="text-center my-0">
            <span className="basic invoice-title text-center bold">{props.type == 'budget' ? labels.title.budget : labels.title.invoice}</span>
          </div>
  
          <div className="card card-default basic border-0 mx-3 my-0">
            <div className="card-head my-0">
              <span className="basic bigtext bold">N??mero de {props.type == 'budget' ? labels.number.budget : labels.number.invoice}: </span>
              <span className="basic bigtext" id="year">
                {FormatHelper.PrintInvoiceTitle(data.year, props.item_id) ?? ""}
              </span>
            </div>
            <div className="card-body my-0">
              <table className="table table-borderless table-customer w100">
                <tbody>
                  <tr>
                    <td className="bigtext bold px-1 py-1" id="customer-name">
                      {customer.name} {customer.lastname}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="address">
                      {customer.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="postal-code">
                      {customer.postalcode}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="town">
                      {customer.town}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="dni">
                      {customer.dni}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="card card-default basic border-0 mx-3 my-0">
            <div className="card-body my-0">
              <table className="table table-sm table-products table-bordered w100">
                <thead>
                  <tr>
                    <th className="text-center medium-text w34">Concepto</th>
                    <th className="text-center medium-text w10">Uds.</th>
                    <th className="text-center medium-text w12">Base Ud.</th>
                    <th className="text-center medium-text w12">Base total</th>
                    <th className="text-center medium-text w10">I.V.A. %</th>
                    <th className="text-center medium-text w12">I.V.A.</th>
                  </tr>
                </thead>
                <tbody id="products-body">
                  {data.concepts && data.concepts.length > 0
                    ? data.concepts.map((concept: any, index: number) => (
                        <tr>
                          <td className="align-middle medium-text">
                            {
                            concept.concept ? concept.concept.split("\n").map((part: any, key: any) => {
                                return <div key={key}>{part}</div>;
                            }) : ''}
                          </td>
                          <td className="text-center align-middle medium-text">
                            {concept.units}
                          </td>
                          <td className="text-center align-middle medium-text">
                            {FormatHelper.FormatCurrency(concept.base)}
                          </td>
                          <td className="text-center align-middle medium-text">
                            {FormatHelper.FormatCurrency(
                              concept.base * concept.units
                            )}
                          </td>
                          <td className="text-center align-middle medium-text">
                            {data.iva ?? "21" + " %"}
                          </td>
                          <td className="text-center align-middle medium-text">
                            {FormatHelper.FormatCurrency(
                              (concept.base * concept.units * (data.iva ?? 21)) /
                                100
                            )}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <div className="card-footer bg-transparent border-0 ml-5 mr-5">
          <div className="card card-default basic border-0 my-0">
            <table className="table table-sm table-price table-bordered w100">
              <thead>
                <tr>
                  <th className="text-right medium-text w65">Base imponible</th>
                  <th className="text-center medium-text w35">
                    Impuesto ({data.iva} %)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="text-right align-middle medium-text"
                    id="total-base-sum"
                  >
                    {FormatHelper.FormatCurrency(data.sum_base)}
                  </td>
                  <td
                    className="text-center align-middle medium-text"
                    id="total-iva-sum"
                  >
                    {FormatHelper.FormatCurrency(data.sum_iva)}
                  </td>
                </tr>
                <tr>
                  <td className="text-right align-middle bold medium-text">
                    TOTAL
                  </td>
                  <td className="text-center align-middle medium-text" id="total">
                    {FormatHelper.FormatCurrency(data.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div className="card card-default basic border-0 my-0">
            <table className="table table-sm table-payment table-bordered w100">
              <tbody id="payment-body">
                {
                  props.type == 'invoice' ? 
                  <tr>
                  <td className="text-right align-middle bold medium-text w65">
                    Tipo pago
                  </td>
                  <td
                    className="text-center align-middle medium-text w35"
                    id="payment"
                  >
                    {payment}
                  </td>
                </tr>
                 : (
                  ""
                )}
              
                {props.type == 'invoice' && data.payment == 2 ? (
                  <tr>
                    <td className="text-right align-middle bold medium-text">
                      IBAN
                    </td>
                    <td className="text-center align-middle medium-text">
                      {user.iban}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
  
                {data.comment != "" ? (
                  <tr>
                    <td
                      className="text-center align-middle medium-text"
                      colSpan={Number(2)}
                    >
                      {data.comment}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
  
          <div className="small-text text-center">
            <span>
              Responsable: Identidad:{" "}
              <span id="footer-fullname">
                {user.name} {user.lastname}
              </span>
              -<span id="footer-dni">NIF: {user.dni}</span>,{" "}
              <span id="footer-phone">Tel??fono: {user.phone}</span>
            </span>
            <br />
            <span>
              Dir.postal: <span id="footer-address">{user.address}</span>,
              <span id="footer-town">{user.town}</span>,
              <span id="footer-province">{user.province}</span>,
              <span id="footer-email">{user.email}</span>
            </span>
            <br />
            <span>
              En nombre de la empresa tratamos la informaci??n que nos facilita con
              el fin de prestarles el servicio solicitado realizar la facturaci??n
              del mismo.
            </span>
            <br />
            <span>
              Los datos proporcionados se conservar??n mientras se mantenga la
              relaci??n comercial o durante los a??os necesarios para cumplir con
              las
            </span>
            <br />
            <span>
              obligaciones legales. Los datos no se ceder??n a terceros salvo en
              los casos en que exista una obligaci??n legal. Usted tiene derecho a
              obtener
            </span>
            <br />
            <span>
              confirmaci??n sobre si en{" "}
              <span id="footer-fullname">
                {user.name} {user.lastname}
              </span>
              estamos tratando sus datos personales por tanto tiene derecho a
              acceder a sus datos
            </span>
            <br />
            <span>
              personales, rectificar los datos inexactos o solicitar su supresi??n
              cuando los datos ya no sean necesarios.
            </span>
            <br />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  }

};

export default Pdf;
