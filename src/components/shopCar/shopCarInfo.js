import {
  AtomGetCustomerShopCarFromFirebase,
  AtomGetAllProductsFromFirebase,
  AtomUserName,
} from "../../Recoil/Atom";
import React from "react";
import { Checkbox } from "antd";
import StyledCard from "../common/StyledCard";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import updateShopCarClient from "../../utils/updateShopCarClient";
import deleteShopCar from "../../axios/deleteShopCar";
import updateShopCar from "../../axios/updateShopCar";

function ShopCarInfo({
  setShowDelete,
  checkDelete,
  setCheckDelete,
  checked,
  setChecked,
  sum,
  setSum,
}) {
  const [shopCar, setShopCar] = useRecoilState(
    AtomGetCustomerShopCarFromFirebase
  );
  const AllProducts = useRecoilValue(AtomGetAllProductsFromFirebase);
  const navigate = useNavigate();
  const userName = useRecoilValue(AtomUserName);
  const [deleteProductId, setDeleteProductId] = React.useState();
  const [currentPrice, setCurrentValue] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      if (checkDelete) {
        await deleteShopCar(userName, deleteProductId);
        await updateShopCarClient(userName, setShopCar);
        setCheckDelete(false);
        setSum(sum - currentPrice);
      }
    })();
  }, [
    userName,
    checkDelete,
    deleteProductId,
    sum,
    currentPrice,
    setShopCar,
    setCheckDelete,
    setSum,
  ]);

  React.useEffect(() => {
    (async () => {
      await updateShopCarClient(userName, setShopCar);
    })();
  }, [userName, setShopCar]);

  function handleInfo(products) {
    return AllProducts.map((AllProduct, index) => {
      if (AllProduct.id === products.productId) {
        return (
          <div
            key={index}
            className="p-4 flex items-cneter justify-between w-full"
          >
            <div className="flex items-center gap-4">
              <Checkbox
                value={products.productId}
                onChange={(e) => {
                  // console.log(e.target.checked);
                  if (e.target.checked) {
                    setChecked([...checked, products.productId]);
                    setSum(sum + products.price * products.count);
                  } else {
                    setChecked(
                      [...checked].filter(
                        (item) => item !== products.productId
                      )
                    );
                    setSum(sum - products.price * products.count);
                  }
                }}
              ></Checkbox>
              <div className="w-20 m-2">
                <StyledCard
                  src={
                    AllProduct.alt.indexOf(products.kind) === -1
                      ? AllProduct.src[0]
                      : AllProduct.src[
                          AllProduct.alt.indexOf(products.kind)
                        ]
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${products.productId}`, {
                      state: {
                        productId: AllProduct.id,
                        src: AllProduct.src,
                        title: AllProduct.title,
                        price: products.price,
                        alt: AllProduct.alt,
                        size: AllProduct.size,
                        kind: AllProduct.kind,
                        customerSize: products.size,
                        customerKind: products.kind,
                        customerCount: products.count,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pr-4 md:gap-4 lg:gap-8 ">
              <div className="w-12 text-center">
                {products.kind ? products.kind : "-"}
              </div>
              <div className="w-12 text-center">
                {products.size ? products.size : "-"}
              </div>
              <div className="w-12 text-center">{products.price}</div>
              <div
                className="w-16 text-center flex gap-2 border border-neutral-800"
                style={{ margin: -15 }}
              >
                <div
                  className="w-10 border-r border-neutral-800 cursor-pointer"
                  onClick={() => {
                    let date = [];
                    shopCar.forEach((shopCarProducts) => {
                      if (shopCarProducts.productId === products.productId) {
                        const updateCount = {
                          ...products,
                          count: products.count + 1,
                        };
                        date.push(updateCount);
                        if (checked.indexOf(products.productId) > -1) {
                          setSum(sum + products.price);
                        }
                        updateShopCar(
                          userName,
                          products.productId,
                          products.price,
                          products.count + 1,
                          products.size,
                          products.kind
                        );
                      } else {
                        date.push(shopCarProducts);
                      }
                    });
                    // console.log(date);
                    setShopCar(date);
                  }}
                >
                  +
                </div>
                <div>
                  {shopCar.map((shopCarProducts) => {
                    if (shopCarProducts.productId === products.productId) {
                      return products.count;
                    }
                    return null;
                  })}
                </div>
                <div
                  className="w-10 border-l border-neutral-800 cursor-pointer"
                  onClick={() => {
                    let date = [];
                    shopCar.forEach((shopCarProducts) => {
                      if (shopCarProducts.productId === products.productId) {
                        if (products.count > 1) {
                          const updateCount = {
                            ...products,
                            count: products.count - 1,
                          };
                          date.push(updateCount);
                          if (checked.indexOf(products.productId) > -1) {
                            setSum(sum - products.price);
                          }
                          updateShopCar(
                            userName,
                            products.productId,
                            products.price,
                            products.count - 1,
                            products.size,
                            products.kind
                          );
                        } else {
                          if (checked.indexOf(products.productId) > -1) {
                            setCurrentValue(products.price);
                          }
                          setShowDelete(true);
                          setDeleteProductId(products.productId);
                          date.push(shopCarProducts);
                        }
                      } else {
                        date.push(shopCarProducts);
                      }
                    });
                    setShopCar(date);
                  }}
                >
                  -
                </div>
              </div>
              <div className="w-16 text-center text-red-500">
                {products.price * products.count}
              </div>
            </div>
          </div>
        );
      }
      // return null;
    });
  }

  if (Array.isArray(shopCar)) {
    // console.log(shopCar)
    return shopCar.map((products, index) => {
      return (
        <div key={index}>
          <div className="w-full bg-neutral-200 my-4 items-center">
            <Checkbox.Group className="w-full">
              {handleInfo(products)}
            </Checkbox.Group>
          </div>
        </div>
      );
    });
  }
}

export default ShopCarInfo;
