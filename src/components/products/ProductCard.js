import { Card } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCard = styled.div`
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

function ProductCard({ src, alt, title, description, path, info }) {
  return (
    <Link
      to={`/product/:${path}`}
      state={{ src, alt, title, description, path, info }}
      className="block w-full p-2 border-0 md:w-1/3 lg:w-1/5 mb-4"
    >
      <Card
        hoverable
        className="w-full h-full border-0"
        cover={<StyledCard src={src} alt={alt} />}
      >
        <Card.Meta
          title={title}
          description={<span className="text-red-500">{description.price}</span>}
          className="text-start"
        />
      </Card>
    </Link>
  );
}

export default ProductCard;
