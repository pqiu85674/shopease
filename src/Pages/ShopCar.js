import {
  AtomGetCustomerShopCarFromFirebase,
  AtomGetAllProductsFromFirebase,
} from "../Recoil/Atom";
import React from "react";
import { Button } from "antd";
import { useRecoilValue } from "recoil";
import TailwindCenter from "../components/common/TailwindCenter";
import Default from "../components/layout/Default";
import ShopCarTitle from "../components/common/ShopCarTitle";
import ShopCarInfo from "../components/shopCar/shopCarInfo";
import { useNavigate } from "react-router-dom";

function ShopCar() {
  const shopCar = useRecoilValue(AtomGetCustomerShopCarFromFirebase);
  const AllProducts = useRecoilValue(AtomGetAllProductsFromFirebase);
  const [showDelete, setShowDelete] = React.useState(false);
  const [sum, setSum] = React.useState(0);
  const [checked, setChecked] = React.useState([]);
  const [checkDelete, setCheckDelete] = React.useState(false);
  const navigate = useNavigate();
  const [noCheck, setNoCheck] = React.useState(false);

  function GoPay() {
    if (checked.length > 0) {
      navigate("/pay", { state: { checked, shopCar, AllProducts, sum } });
    } else {
      setNoCheck(true);
      setTimeout(() => {
        setNoCheck(false);
      }, 2000);
    }
  }

  return (
    <Default>
      <ShopCarTitle />
      <ShopCarInfo
        setShowDelete={setShowDelete}
        checkDelete={checkDelete}
        setCheckDelete={setCheckDelete}
        setChecked={setChecked}
        checked={checked}
        sum={sum}
        setSum={setSum}
      />
      <div className="w-full bg-neutral-200 my-4 py-4 px-12 flex items-center justify-between ">
        <div></div>
        <div className="flex items-center gap-4">
          <div>
            總金額：<span className="text-red-500">{sum}</span>
          </div>
          {/* {console.log(shopCar)} */}
          <Button type="primary" onClick={GoPay}>
            結帳
          </Button>
        </div>
      </div>
      <TailwindCenter isVisible={noCheck}>
        <div className="m-8 text-neutral-200">請勾選商品</div>
      </TailwindCenter>
      <TailwindCenter isVisible={showDelete}>
        <div className="text-neutral-300 my-4 mx-8">確定刪除此商品</div>
        <div className="flex mb-4 gap-4">
          <Button
            size="small"
            onClick={(e) => {
              setShowDelete(false);
            }}
            value="cancel"
          >
            取消
          </Button>
          <Button
            size="small"
            onClick={(e) => {
              setShowDelete(false);
              setCheckDelete(true);
            }}
            value="check"
          >
            確定
          </Button>
        </div>
      </TailwindCenter>
    </Default>
  );
}

export default ShopCar;
