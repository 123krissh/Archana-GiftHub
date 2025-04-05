// import React from "react";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// // import { data } from "react-router-dom";

// function PayPalButton({ amount, onSuccess, onError }) {
//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId:
//           "AThnnVP2gf2K6z0iZTii8fdxdYY3Kt-F9aEIgvv0dHvFQcEN_Z674Ue07VwSzQbGHiIk51QynlKR1muW",
//       }}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical" }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [{ amount: { value: amount } }],
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then(onSuccess);
//         }}
//         onError={onError}
//       />
//     </PayPalScriptProvider>
//   );
// }

// export default PayPalButton;

import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function PayPalButton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AThnnVP2gf2K6z0iZTii8fdxdYY3Kt-F9aEIgvv0dHvFQcEN_Z674Ue07VwSzQbGHiIk51QynlKR1muW",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError} // Fixed incorrect usage
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
