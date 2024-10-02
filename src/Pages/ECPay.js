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
          setPaymentForm(response); // 只有在 response 是字串時才設置
        } else {
          console.error("Response is not a valid HTML string");
        }
      } catch (error) {
        console.error("Error fetching payment form:", error);
      }
    }

    fetchPaymentForm();
  }, [order, userUid]);

  // 在表單渲染後自動提交
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
          dangerouslySetInnerHTML={{ __html: paymentForm }} // 插入 HTML 並渲染
        />
      ) : (
        <p>處理付款中...</p> // 資料還在請求中時顯示的訊息
      )}
    </div>
  );
}

export default ECPay;
