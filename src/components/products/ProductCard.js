import { Card } from "antd";
import StyledCard from "../common/StyledCard";
import { Link } from "react-router-dom";



function ProductCard({ productId, src, title, price, alt, size, kind }) {
  return (
    <Link
      to={`/product/${productId}`}
      state={{ productId, src, title, price, alt, size, kind }}
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
