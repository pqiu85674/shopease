import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ShopCarNone() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-4">購物車目前是空的！</div>
      <Button
        className="mb-4"
        type="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        選擇商品
      </Button>
    </div>
  );
}

export default ShopCarNone;
