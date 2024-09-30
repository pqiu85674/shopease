import ShopCarTitle from "../components/common/ShopCarTitle";
import Default from "../components/layout/Default";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetail from "../components/products/ProductDetail";
import { Button } from "antd";
import React from "react";

function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checked, shopCar, AllProducts, sum } = location.state || {};
  const order = shopCar.filter((item) => checked.includes(item.productId));

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
            <Button
              type="primary"
              danger
              onClick={() => {
                navigate("/ECPay", { state: { order } });
              }}
            >
              送出訂單
            </Button>
          </div>
        </div>
      </div>
    </Default>
  );
}

export default Pay;
