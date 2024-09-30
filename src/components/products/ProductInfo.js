import { useNavigate } from "react-router-dom";
import { InputNumber, Button, Carousel, Radio } from "antd";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import StyledCard from "../common/StyledCard";
import {
  AtomGetCustomerShopCarFromFirebase,
  AtomIsMember,
  AtomUserUid,
} from "../../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import updateShopCar from "../../axios/updateShopCar";
import { FaCheckCircle } from "react-icons/fa";
import TailwindCenter from "../common/TailwindCenter";
import customerShopCar from "../../axios/customerShopCar";

const ProductInfo = ({
  productId,
  src,
  title,
  price,
  alt,
  size,
  kind,
  customerSize,
  customerKind,
  customerCount,
}) => {
  const isMember = useRecoilValue(AtomIsMember);
  const userUid = useRecoilValue(AtomUserUid);
  const navigate = useNavigate();
  const [selectSize, setSelectSize] = React.useState();
  const [selectKind, setSelectKind] = React.useState();
  const [count, setCount] = React.useState(customerCount ? customerCount : 1);
  const refKind = React.useRef();
  const setShopCar = useSetRecoilState(AtomGetCustomerShopCarFromFirebase);

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (customerKind) {
      refKind.current.goTo(kind.indexOf(customerKind));
    }
  }, [customerKind]);

  function picture() {
    if (src.length > 1) {
      return src.map((item, index) => {
        return <StyledCard key={index} src={item} />;
      });
    } else {
      return <StyledCard src={src[0]} />;
    }
  }

  function handleVisible() {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }
  return (
    <>
      <div className="bg-neutral-100 rounded-lg p-8">
        <div className="flex">
          <div className="flex-[2] flex justify-center items-center">
            <Carousel
              dots={false}
              arrows
              className="h-full w-64"
              ref={(ref) => {
                refKind.current = ref;
              }}
            >
              {picture()}
            </Carousel>
          </div>
          <div className="flex-[3] p-8">
            <div className="text-4xl">{title}</div>
            <div className="text-red-500 m-4 p-2 bg-neutral-200">${price}</div>
            {kind.length > 1 && (
              <div className="flex gap-2 my-4">
                <div>種類：</div>
                <Radio.Group
                  defaultValue={customerKind ? customerKind : null}
                  onChange={(e) => {
                    const selectedItem = kind.find(
                      (item) => item === e.target.value
                    );
                    refKind.current.goTo(kind.indexOf(selectedItem));
                    setSelectKind(e.target.value);
                  }}
                >
                  {kind.map((item, index) => (
                    <Radio key={index} value={item}>
                      {item}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            )}
            {size.length > 1 && (
              <div className="flex gap-4 my-4">
                <div>size：</div>
                <Radio.Group
                  defaultValue={customerSize ? customerSize : null}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    setSelectSize(e.target.value);
                  }}
                >
                  {size.map((item, index) => (
                    <Radio key={index} value={item}>
                      {item}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <div>數量：</div>
              <InputNumber
                defaultValue={customerCount ? customerCount : 1}
                min={1}
                onChange={(e) => {
                  setCount(e);
                }}
                changeOnWheel
                className="w-16"
              />
            </div>
            <div className="pt-8 flex gap-4 justify-center">
              <Button
                className="text-xl"
                type="primary"
                onClick={async () => {
                  !isMember && navigate("/signIn");
                  await updateShopCar(
                    userUid,
                    productId,
                    price,
                    count,
                    selectSize,
                    selectKind
                  );
                  console.log(await customerShopCar(userUid));
                  setShopCar(await customerShopCar(userUid));
                  handleVisible();
                }}
              >
                <FaShoppingCart />
                加入購物車
              </Button>
              <Button
                className="text-xl"
                type="primary"
                onClick={async () => {
                  if (
                    kind.length > 0 &&
                    selectKind === undefined &&
                    customerKind === undefined
                  ) {
                    alert("請選擇種類");
                  } else if (
                    size.length > 0 &&
                    selectSize === undefined &&
                    customerSize === undefined
                  ) {
                    alert("請選擇size");
                  } else if (!isMember) {
                    navigate("/signIn");
                  } else {
                    await updateShopCar(
                      userUid,
                      productId,
                      price,
                      count,
                      selectSize,
                      selectKind
                    );
                    navigate("/shopCar");
                  }
                }}
              >
                <HiCurrencyDollar />
                直接購買
              </Button>
            </div>
          </div>
        </div>
      </div>
      <TailwindCenter isVisible={isVisible}>
        <FaCheckCircle className="text-neutral-200  mt-4" size={60} />
        <div className="text-neutral-200 text-weight-900 m-4">已加入購物車</div>
      </TailwindCenter>
    </>
  );
};

export default ProductInfo;
