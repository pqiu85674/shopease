import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Container from "../components/common/Container";
import { InputNumber, Button } from "antd";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";

const StyledCard = styled.div`
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

function Product({ children }) {
  const location = useLocation();
  const { src, title, description, info } = location.state || {};

  return (
    <div>
      <Header></Header>
      <Container className="bg-neutral-300">
        <div className="bg-neutral-100 rounded-lg p-8">
          <div className="flex">
            <div className="flex-[2]">
              <StyledCard src={src} />
            </div>
            <div className="flex-[3] p-8">
              <div className="text-4xl">{title}</div>
              <div className="my-2">{info}</div>
              <div className="text-red-500 m-4 p-2 bg-neutral-200">
                ${description.price}
              </div>
              <div>數量：</div>
              <InputNumber
                defaultValue={1}
                onChange={() => {}}
                changeOnWheel
                className="w-16"
              />
              <div className="pt-8 flex gap-4 justify-center">
                <Button className="text-xl" type="primary">
                  <FaShoppingCart />
                  加入購物車
                </Button>
                <Button className="text-xl" type="primary">
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
