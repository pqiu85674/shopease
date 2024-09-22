import Header from "../components/layout/Header";
import Container from "../components/common/Container";
import {
  AtomGetCustomerShopCarFromFirebase,
  AtomGetAllProductsFromFirebase,
} from "../Recoil/Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import React from "react";
import { Checkbox, InputNumber } from "antd";
import StyledCard from "../components/common/StyledCard";
import { useNavigate } from "react-router-dom";
import { AtomUserName } from "../Recoil/Atom";
import customerShopCar from "../axios/CustomerShopCar";

function ShopCar() {
  const [shopCar, setShopCar] = useRecoilState(
    AtomGetCustomerShopCarFromFirebase
  );
  const AllProducts = useRecoilValue(AtomGetAllProductsFromFirebase);
  const userName = useRecoilValue(AtomUserName);
  const navigate = useNavigate();

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  React.useEffect(() => {
    async function fetchShopCar() {
      const response = await customerShopCar(userName);
      setShopCar(
        Object.entries(response.data).map((element) => {
          return element;
        })
      );
    }
    fetchShopCar();
  }, [userName, setShopCar]);

  function handleInfo(products) {
    // console.log(products);
    // console.log(AllProducts);
    return products.map((product, index) => {
      if (typeof product === "string") {
        return null;
      } else if (!Array.isArray(product) && typeof product === "object") {
        return (
          AllProducts &&
          AllProducts.map((AllProduct) => {
            if (AllProduct.id === product.productId) {
              return (
                <div
                  key={index}
                  className="p-4 flex items-cneter justify-between w-full cursor-pointer"
                  onClick={() => {
                    // console.log(product.productId);
                    navigate(`/product/${product.productId}`, {
                      state: {
                        productId: AllProduct.id,
                        src: AllProduct.src,
                        title: AllProduct.title,
                        price: AllProduct.price,
                        alt: AllProduct.alt,
                        size: AllProduct.size,
                        kind: AllProduct.kind,
                      },
                    });
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      value={product.productId}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    ></Checkbox>
                    <div className="w-20 m-2">
                      <StyledCard src={AllProduct.src[0]} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pr-4 md:gap-4 lg:gap-8 ">
                    <div className="w-12 text-center">
                      {product.kind ? product.kind : "-"}
                    </div>
                    <div className="w-12 text-center">
                      {product.size ? product.size : "-"}
                    </div>
                    <div className="w-12 text-center">{AllProduct.price}</div>
                    <div
                      className="w-12 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <InputNumber
                        defaultValue={product.count}
                        min={0}
                        onChange={(e) => {
                          console.log(e);
                        }}
                        changeOnWheel
                        className="w-16"
                      />
                      {/* {product.count} */}
                    </div>
                    <div className="w-16 text-center text-red-500">
                      {AllProduct.price * product.count}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        );
      } else {
        return null;
      }
    });
  }

  function lookShopCar(shopCar) {
    if (Array.isArray(shopCar)) {
      return shopCar.map((products, index) => {
        return (
          <div key={index}>
            <div className="w-full bg-neutral-200 my-4 items-center">
              <Checkbox.Group onChange={onChange} className="w-full">
                {handleInfo(products)}
              </Checkbox.Group>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <>
      <Header />
      <Container>
        <div className="w-full bg-neutral-200 my-4 py-4 px-12 flex items-center justify-between ">
          <div>
            <div className="w-16 text-center">產品</div>
          </div>
          <did className="flex gap-6 md:gap-8 lg:gap-12 ">
            <div className="flex-1 w-8 text-center">種類</div>
            <div className="flex-1 w-8 text-center">大小</div>
            <div className="flex-1 w-8 text-center">單價</div>
            <div className="flex-1 w-8 text-center">數量</div>
            <div className="flex-1 w-8 text-center">總計</div>
          </did>
        </div>
        {lookShopCar(shopCar)}
      </Container>
    </>
  );
}

export default ShopCar;
