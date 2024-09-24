import Header from "../components/layout/Header";
import Container from "../components/common/Container";
import {
  AtomGetCustomerShopCarFromFirebase,
  AtomGetAllProductsFromFirebase,
  AtomUserName,
} from "../Recoil/Atom";
import React from "react";
import { Button, Checkbox } from "antd";
import StyledCard from "../components/common/StyledCard";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import updateShopCarClient from "../utils/updateShopCarClient";
import deleteShopCar from "../axios/deleteShopCar";
import TailwindCenter from "../components/common/TailwindCenter";
import updateShopCar from "../axios/updateShopCar";

function ShopCar() {
  const [shopCar, setShopCar] = useRecoilState(
    AtomGetCustomerShopCarFromFirebase
  );
  const AllProducts = useRecoilValue(AtomGetAllProductsFromFirebase);
  const navigate = useNavigate();
  const userName = useRecoilValue(AtomUserName);
  const [showDelete, setShowDelete] = React.useState(false);
  const [checkDelete, setCheckDelete] = React.useState(false);
  const [deleteProductId, setDeleteProductId] = React.useState();

  React.useEffect(() => {
    (async () => {
      if (checkDelete) {
        await deleteShopCar(userName, deleteProductId);
        await updateShopCarClient(userName, setShopCar);
      }
    })();
  }, [checkDelete, deleteProductId]);

  React.useEffect(() => {
    (async () => {
      await updateShopCarClient(userName, setShopCar);
    })();
  }, []);

  function handleInfo(products) {
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
                  className="p-4 flex items-cneter justify-between w-full"
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      value={product.productId}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    ></Checkbox>
                    <div className="w-20 m-2">
                      <StyledCard
                        src={
                          AllProduct.alt.indexOf(product.kind) === -1
                            ? AllProduct.src[0]
                            : AllProduct.src[
                                AllProduct.alt.indexOf(product.kind)
                              ]
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/product/${product.productId}`, {
                            state: {
                              productId: AllProduct.id,
                              src: AllProduct.src,
                              title: AllProduct.title,
                              price: AllProduct.price,
                              alt: AllProduct.alt,
                              size: AllProduct.size,
                              kind: AllProduct.kind,
                              customerSize: product.size,
                              customerKind: product.kind,
                              customerCount: product.count,
                            },
                          });
                        }}
                      />
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
                      className="w-16 text-center flex gap-2 border border-neutral-800"
                      style={{ margin: -15 }}
                    >
                      <div
                        className="w-10 border-r border-neutral-800 cursor-pointer"
                        onClick={() => {
                          let date = [];
                          shopCar.forEach((products) => {
                            if (products[1].productId === product.productId) {
                              const updateCount = {
                                ...products[1],
                                count: products[1].count + 1,
                              };
                              date.push([products[0], updateCount]);
                              updateShopCar(
                                userName,
                                product.productId,
                                product.count + 1,
                                product.size,
                                product.kind
                              );
                            } else {
                              date.push(products);
                            }
                          });
                          setShopCar(date);
                        }}
                      >
                        +
                      </div>
                      <div>
                        {shopCar.map((products) => {
                          if (products[1].productId === product.productId) {
                            return products[1].count;
                          }
                        })}
                      </div>
                      <div
                        className="w-10 border-l border-neutral-800 cursor-pointer"
                        onClick={() => {
                          let date = [];
                          shopCar.forEach((products) => {
                            if (products[1].productId === product.productId) {
                              if (products[1].count > 1) {
                                const updateCount = {
                                  ...products[1],
                                  count: products[1].count - 1,
                                };
                                date.push([products[0], updateCount]);
                                updateShopCar(
                                  userName,
                                  product.productId,
                                  product.count - 1,
                                  product.size,
                                  product.kind
                                );
                              } else {
                                setShowDelete(true);
                                setDeleteProductId(products[1].productId);
                                date.push(products);
                              }
                            } else {
                              date.push(products);
                            }
                          });
                          setShopCar(date);
                        }}
                      >
                        -
                      </div>
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
              <Checkbox.Group className="w-full">
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
          <div className="flex gap-6 md:gap-8 lg:gap-12 ">
            <div className="flex-1 w-8 text-center">種類</div>
            <div className="flex-1 w-8 text-center">大小</div>
            <div className="flex-1 w-8 text-center">單價</div>
            <div className="flex-1 w-8 text-center">數量</div>
            <div className="flex-1 w-8 text-center">總計</div>
          </div>
        </div>
        {lookShopCar(shopCar)}
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
      </Container>
    </>
  );
}

export default ShopCar;
