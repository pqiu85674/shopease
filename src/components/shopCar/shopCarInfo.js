import {
  AtomGetCustomerShopCarFromFirebase,
  AtomGetAllProductsFromFirebase,
  AtomUserName,
  AtomUserUid,
} from "../../Recoil/Atom";
import React from "react";
import { Checkbox } from "antd";
import StyledCard from "../common/StyledCard";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import deleteShopCar from "../../axios/deleteShopCar";
import updateShopCar from "../../axios/updateShopCar";
import customerShopCar from "../../axios/customerShopCar";
import RowAndCol from "../common/RowAndCol";
import styled from "styled-components";

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
  const userUid = useRecoilValue(AtomUserUid);
  const [deleteProductId, setDeleteProductId] = React.useState();
  const [currentPrice, setCurrentValue] = React.useState(0);

  const StyledCheckbox = styled(Checkbox)`
    .ant-checkbox {
      transform: scale(2);
    }

    .ant-checkbox-checked .ant-checkbox-inner,
    .ant-checkbox-inner {
      width: 16px;
      height: 16px;
    }

    .ant-checkbox + span {
      font-size: 18px;
    }
  `;
  React.useEffect(() => {
    (async () => {
      if (checkDelete) {
        await deleteShopCar(userUid, deleteProductId);
        setShopCar(await customerShopCar(userUid));
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
    userUid,
  ]);

  React.useEffect(() => {
    (async () => {
      setShopCar(await customerShopCar(userUid));
    })();
  }, [userUid, setShopCar]);

  function handleInfo(products) {
    return AllProducts.map((AllProduct, index) => {
      if (AllProduct.id === products.productId) {
        return (
          <RowAndCol
            key={index}
            col1={
              <StyledCheckbox
                value={products.productId}
                onChange={(e) => {
                  if (e.target.checked) {
                    setChecked([...checked, products.productId]);
                    setSum(sum + products.price * products.count);
                  } else {
                    setChecked(
                      [...checked].filter((item) => item !== products.productId)
                    );
                    setSum(sum - products.price * products.count);
                  }
                }}
              ></StyledCheckbox>
            }
            col2={
              <div className="w-full h-hull">
                <StyledCard
                  src={
                    AllProduct.kind.indexOf(products.kind) === -1
                      ? AllProduct.src[0]
                      : AllProduct.src[AllProduct.kind.indexOf(products.kind)]
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
            }
            col3={<div>{AllProduct.title}</div>}
            col4={
              <div className="text-center">
                {products.kind ? products.kind : "-"}
              </div>
            }
            col5={
              <div className="text-center">
                {products.size ? products.size : "-"}
              </div>
            }
            col6={<div className="text-center">{products.price}</div>}
            col7={
              <div
                className="w-16 text-center flex gap-2 border border-neutral-800"
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
                          userUid,
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
                            userUid,
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
            }
            col8={
              <div className="text-center text-red-500">
                {products.price * products.count}
              </div>
            }
          />
        );
      }
      return null;
    });
  }

  if (Array.isArray(shopCar)) {
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
