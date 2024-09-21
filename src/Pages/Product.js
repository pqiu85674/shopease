import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Container from "../components/common/Container";
import { InputNumber, Button, Carousel, Radio } from "antd";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { AtomIsMember, AtomShopCar } from "../Recoil/Atom";
import { useRecoilValue, useRecoilState } from "recoil";
import React from "react";

const StyledCard = styled.div`
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

function Product() {
  const isMember = useRecoilValue(AtomIsMember);
  const [shopCar, setShopCar] = useRecoilState(AtomShopCar);
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, src, title, price, alt, size } = location.state || {};
  const [customerSize, setCustomerSize] = React.useState();

  const selectPicture = React.useRef();

  function handleSrc() {
    return src.map((item, index) => {
      return <StyledCard key={productId} src={item} alt={alt[index]} />;
    });
  }

  return (
    <div>
      <Header></Header>
      <Container className="bg-neutral-300">
        <div className="bg-neutral-100 rounded-lg p-8">
          <div className="flex">
            <div className="flex-[2] flex justify-center items-center">
              <Carousel
                dots={false}
                arrows
                className="h-full w-64"
                ref={(ref) => {
                  selectPicture.current = ref;
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
              {alt.length > 1 && (
                <div className="flex gap-2 my-4">
                  <div>種類：</div>
                  <Radio.Group
                    onChange={(e) => {
                      selectPicture.current.goTo(e.target.value);
                    }}
                  >
                    {alt.map((item, index) => (
                      <Radio key={index} value={item}>
                        {item}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              )}
              {size && (
                <div className="flex gap-4 my-4">
                  <div>size：</div>
                  <Radio.Group
                    onChange={(e) => {
                      setCustomerSize(e.target.value);
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
                  onChange={() => {}}
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
                    setShopCar(shopCar + 1);
                  }}
                >
                  <FaShoppingCart />
                  加入購物車
                </Button>
                <Button
                  className="text-xl"
                  type="primary"
                  onClick={() => {
                    !isMember && navigate("/signIn");
                    setShopCar(0);
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
