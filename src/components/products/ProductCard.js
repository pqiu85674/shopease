import { Card } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCard = styled.div`
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

function ProductCard({ productId, src, title, price, alt, size }) {
  return (
    <Link
      to={`/product/:${productId}`}
      state={{ productId, src, title, price, alt, size }}
      className="block w-full p-2 border-0 md:w-1/3 lg:w-1/5 mb-4"
    >
      <Card
        hoverable
        className="w-full h-full border-0 p-0.5"
        cover={<StyledCard src={src[0]} alt={alt[0]} />}
      >
        <Card.Meta
          title={title}
          description={<span className="text-red-500">{price}</span>}
          className="text-start"
        />
      </Card>
    </Link>
  );
}

export default ProductCard;
