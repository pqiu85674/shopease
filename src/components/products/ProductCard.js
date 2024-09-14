import { Card } from "antd";
import styled from "styled-components";

const StyledCard = styled.div`
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

function ProductCard({ src, alt, title, description }) {
  return (
    <Card
      hoverable
      className="w-full p-2 border-0 md:w-1/3 lg:w-1/5"
      cover={<StyledCard src={src} alt={alt} />}
    >
      {console.log(src)}
      <Card.Meta title={title} description={description} />
    </Card>
  );
}

export default ProductCard;
