import React from "react";
import { Page, Document } from "@react-pdf/renderer";
import PdfInterface from "../interfaces/PdfInterface";
import "../theme/pdf.css";

const Pdf: React.FC<PdfInterface> = () => {
  return (
    <Document>
      <Page size="A4">
        <div className="card card-default">
          <div className="card-body">
            <div className="card card-default border-0 mx-2 my-0">
              <div className="card-body">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/invoice_logo.jpeg"}
                  alt="Instalaciones ML"
                  width="160"
                  height="90"
                />
                <table className="table table-borderless">
                  <tr>
                    <td
                      className="basic bigtext bold pb-0"
                      id="user-fullname"
                    ></td>
                    <td
                      className="basic bigtext bold pb-0"
                      id="today"
                    ></td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-address"></td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-town"></td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-postal-code"></td>
                  </tr>
                  <tr>
                    <td className="basic pb-0" id="user-dni"></td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="container text-center my-0">
              <span className="basic invoice-title bold">FACTURA</span>
            </div>

            <div className="card card-default basic border-0 mx-3 my-0">
              <div className="card-head my-0">
                <span className="basic bigtext bold">Número de factura: </span>
                <span className="basic bigtext" id="year"></span>-
                <span className="basic bigtext" id="invoice-id"></span>
              </div>
              <div className="card-body my-0">
                <table className="table table-borderless table-customer">
                  <tr>
                    <td className="bigtext bold px-1 py-1" id="customer-name"></td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="address"></td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="postal-code"></td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="town"></td>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 medium-text" id="dni"></td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="card card-default basic border-0 mx-3 my-0">
              <div className="card-body my-0">
                <table className="table table-sm table-products table-bordered">
                  <thead>
                    <tr>
                      <th
                        className="text-center medium-text"
                      >
                        Concepto
                      </th>
                      <th className="text-center medium-text">
                        Uds.
                      </th>
                      <th className="text-center medium-text">
                        Base Ud.
                      </th>
                      <th className="text-center medium-text">
                        Base total
                      </th>
                      <th className="text-center medium-text">
                        I.V.A. %
                      </th>
                      <th className="text-center medium-text">
                        I.V.A.
                      </th>
                    </tr>
                  </thead>
                  <tbody id="products-body"></tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card-footer bg-transparent border-0 ml-5 mr-5">
            <div className="card card-default basic border-0 my-0">
              <table className="table table-sm table-price table-bordered">
                <thead>
                  <tr>
                    <th
                      className="text-right medium-text"
                    >
                      Base imponible
                    </th>
                    <th className="text-center medium-text">
                      Impuesto (<span id="tax-iva"></span>)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-right align-middle medium-text"
                      id="total-base-sum"
                    ></td>
                    <td
                      className="text-center align-middle medium-text"
                      id="total-iva-sum"
                    ></td>
                  </tr>
                  <tr>
                    <td className="text-right align-middle bold medium-text">
                      TOTAL
                    </td>
                    <td
                      className="text-center align-middle medium-text"
                      id="total"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card card-default basic border-0 my-0">
              <table className="table table-sm table-payment table-bordered">
                <tbody id="payment-body">
                  <tr>
                    <td
                      className="text-right align-middle bold medium-text"
                    >
                      Tipo pago
                    </td>
                    <td
                      className="text-center align-middle medium-text"
                      id="payment"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="small-text text-center">
              <span>
                Responsable: Identidad: <span id="footer-fullname"></span> -
                <span id="footer-dni"></span>, <span id="footer-phone"></span>
              </span>
              <br />
              <span>
                Dir.postal: <span id="footer-address"></span>,
                <span id="footer-town"></span>,{" "}
                <span id="footer-province"></span>,
                <span id="footer-email"></span>
              </span>
              <br />
              <span>
                En nombre de la empresa tratamos la información que nos facilita
                con el fin de prestarles el servicio solicitado realizar la
                facturación del mismo.
              </span>
              <br />
              <span>
                Los datos proporcionados se conservarán mientras se mantenga la
                relación comercial o durante los años necesarios para cumplir
                con las
              </span>
              <br />
              <span>
                obligaciones legales. Los datos no se cederán a terceros salvo
                en los casos en que exista una obligación legal. Usted tiene
                derecho a obtener
              </span>
              <br />
              <span>
                confirmación sobre si en <span id="footer-fullname"></span>{" "}
                estamos tratando sus datos personales por tanto tiene derecho a
                acceder a sus datos
              </span>
              <br />
              <span>
                personales, rectificar los datos inexactos o solicitar su
                supresión cuando los datos ya no sean necesarios.
              </span>
              <br />
            </div>
          </div>
        </div>
      </Page>
    </Document>
  );
};

export default Pdf;
