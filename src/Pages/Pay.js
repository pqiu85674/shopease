import ShopCarTitle from "../components/common/ShopCarTitle";
import Default from "../components/layout/Default";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetail from "../components/products/ProductDetail";
import { Button } from "antd";
import React from "react";
import TailwindCenter from "../components/common/TailwindCenter";

function Pay() {
  const location = useLocation();
  const [isPay, setIsPay] = React.useState(false);
  const { checked, shopCar, AllProducts, sum } = location.state || {};
  const navigate = useNavigate();

  async function checkPay() {
    setIsPay(true);
    function delay(ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    }
    await delay(1000);
    setIsPay(false);
    navigate("/");
  }

  // async function checkPay() {
  //   // 設定支付狀態
  //   setIsPay(true);
  
  //   // 延遲函數
  //   function delay(ms) {
  //     return new Promise((resolve) => {
  //       setTimeout(resolve, ms); // 在 ms 毫秒後執行 resolve
  //     });
  //   }
  
  //   // 等待 1 秒
  //   await delay(1000);
  
  //   // 設定支付狀態為 false
  //   setIsPay(false);
  
  //   // 導航到首頁
  //   navigate("/");
  // }

  return (
    <Default>
      <ShopCarTitle />
      <ProductDetail
        checked={checked}
        shopCar={shopCar}
        AllProducts={AllProducts}
      ></ProductDetail>

      <div className="bg-neutral-200 p-4 mt-4">
        <div className="flex justify-between mb-4 px-8">
          <div>付款方式</div>
          <div>貨到付款</div>
        </div>
        <div>
          <div className="text-end pr-8">
            <div className="mb-4">
              總計金額：<span className="text-red-500">{sum}</span>
            </div>
            <Button type="primary" danger onClick={checkPay}>
              下訂單
            </Button>
          </div>
        </div>
      </div>
      <TailwindCenter isVisible={isPay}>
        <div className="m-6 text-red-500 text-lg">訂單已送出</div>
      </TailwindCenter>
    </Default>
  );
}

export default Pay;
