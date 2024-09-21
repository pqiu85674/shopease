import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Container from "../components/common/Container";
import { InputNumber, Button, Carousel, Radio } from "antd";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { AtomIsMember, AtomUserName } from "../Recoil/Atom";
import { useRecoilValue, useRecoilState } from "recoil";
import React from "react";
import addShopCar from "../axios/addShopCar";

const StyledCard = styled.div`
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

function Product() {
  const userName = useRecoilValue(AtomUserName);
  const isMember = useRecoilValue(AtomIsMember);
  // const [shopCar, setShopCar] = useRecoilState(AtomShopCar);
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, src, title, price, alt, size, kind } =
    location.state || {};
  const [selectSize, setSelectSize] = React.useState();
  const [selectKind, setSelectKind] = React.useState();
  const [count, setCount] = React.useState(1);
  const refKind = React.useRef();

  function handleSrc() {
    return src.map((item, index) => {
      return <StyledCard key={productId} src={item} alt={alt[index]} />;
    });
  }

  return (
    <div>
      <Header></Header>
      <Container>
        <div className="bg-neutral-100 rounded-lg p-8">
          <div className="flex">
            <div className="flex-[2] flex justify-center items-center">
              <Carousel
                dots={false}
                arrows
                className="h-full w-64"
                ref={(ref) => {
                  // console.log(ref);
                  refKind.current = ref;
                }}
              >
                {handleSrc()}
              </Carousel>
            </div>
            <div className="flex-[3] p-8">
              <div className="text-4xl">{title}</div>
              <div className="text-red-500 m-4 p-2 bg-neutral-200">
                ${price}
              </div>
              {kind.length > 1 && (
                <div className="flex gap-2 my-4">
                  <div>種類：</div>
                  <Radio.Group
                    onChange={(e) => {
                      refKind.current.goTo(e.target.value);
                      setSelectKind(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {kind.map((item, index) => (
                      <Radio key={index} value={index}>
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
                  defaultValue={1}
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
                  onClick={() => {
                    !isMember && navigate("/signIn");
                    addShopCar(
                      userName,
                      productId,
                      count,
                      selectSize,
                      alt[selectKind]
                    );
                  }}
                >
                  <FaShoppingCart />
                  加入購物車
                </Button>
                <Button
                  className="text-xl"
                  type="primary"
                  onClick={() => {
                    if (kind.length > 0 && selectKind === undefined) {
                      alert("請選擇種類");
                    } else if (size.length > 0 && selectSize === undefined) {
                      alert("請選擇size");
                    } else if (!isMember) {
                      navigate("/signIn");
                    } else {
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
      </Container>
    </div>
  );
}

export default Product;
