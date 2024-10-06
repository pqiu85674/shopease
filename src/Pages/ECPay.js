import ECPayAxios from "../axios/ECPayAxios";
import React from "react";
import { useLocation } from "react-router-dom";
import { AtomUserUid } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

function ECPay() {
  const [paymentForm, setPaymentForm] = React.useState(null);
  const location = useLocation();
  const userUid = useRecoilValue(AtomUserUid);

  const { order } = location.state || {};

  React.useEffect(() => {
    async function fetchPaymentForm() {
      try {
        const response = await ECPayAxios(order, userUid);
        if (typeof response === "string") {
          setPaymentForm(response);
        } else {
          console.error("Response is not a valid HTML string");
        }
      } catch (error) {
        console.error("Error fetching payment form:", error);
      }
    }

    fetchPaymentForm();
  }, [order, userUid]);

  React.useEffect(() => {
    if (paymentForm) {
      const form = document.getElementById("_form_aiochk");
      if (form) {
        form.submit();
      }
    }
  }, [paymentForm]);

  return (
    <div>
      {paymentForm ? (
        <div
          dangerouslySetInnerHTML={{ __html: paymentForm }}
        />
      ) : (
        <p>處理付款中...</p>
      )}
    </div>
  );
}

export default ECPay;
