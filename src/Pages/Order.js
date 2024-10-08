import React from "react";
import order from "../axios/order";
import RowAndCol from "../components/common/RowAndCol";
import Default from "../components/layout/Default";
import ProductTitle from "../components/products/ProductTitle";
import { AtomUserUid, AtomGetAllProductsFromFirebase } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";
import StyledCard from "../components/common/StyledCard";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Order() {
  const userUid = useRecoilValue(AtomUserUid);
  const AllProducts = useRecoilValue(AtomGetAllProductsFromFirebase);
  const [orderInfo, setOrder] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchOrder() {
      const response = await order(userUid);
      if (response) {
        const sortOrderInfo = Object.entries(response.order).sort((a, b) => {
          const dateA = new Date(a[1].TradeDate);
          const dateB = new Date(b[1].TradeDate);
          return dateB - dateA;
        });
        setOrder(sortOrderInfo);
      }
    }
    fetchOrder();
  }, [userUid]);

  return (
    <Default>
      {!orderInfo && (
        <div className="my-4">
          <div className="mb-4">沒有交易紀錄</div>
          <Button type="primary">回首頁</Button>
        </div>
      )}
      {orderInfo && (
        <>
          <ProductTitle />
          {orderInfo.map((order) => {
            return order[1].orderInfo.map((item, index) => {
              return AllProducts.map((AllProduct) => {
                if (AllProduct.id === item.productId) {
                  return (
                    <div key={index}>
                      <RowAndCol
                        col2={
                          <div className="w-full h-full">
                            <StyledCard
                              src={
                                AllProduct.src[
                                  AllProduct.kind.indexOf(item.kind) > -1
                                    ? AllProduct.kind.indexOf(item.kind)
                                    : 0
                                ]
                              }
                            />
                          </div>
                        }
                        col3={AllProduct.title}
                        col4={item.kind ? item.kind : "-"}
                        col5={item.size ? item.size : "-"}
                        col6={item.price}
                        col7={item.count}
                        col8={
                          <div className="text-red-500">
                            {item.price * item.count}
                          </div>
                        }
                      />
                      <div className="flex justify-between mb-12 px-8">
                        <div>產品於 {order[1].TradeDate} 購買</div>
                        <Button
                          type="primary"
                          onClick={() => {
                            navigate(`/product/${item.productId}`, {
                              state: {
                                productId: AllProduct.id,
                                src: AllProduct.src,
                                title: AllProduct.title,
                                price: item.price,
                                alt: AllProduct.alt,
                                size: AllProduct.size,
                                kind: AllProduct.kind,
                                customerSize: item.size,
                                customerKind: item.kind,
                                customerCount: item.count,
                              },
                            });
                          }}
                        >
                          再次訂購
                        </Button>
                      </div>
                    </div>
                  );
                }
                return null;
              });
            });
          })}
        </>
      )}
    </Default>
  );
}
export default Order;
