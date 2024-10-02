import { Button } from "antd";
import { useNavigate } from "react-router-dom";
function PaymentResult() {
  const navigate = useNavigate();
  return (
    <div className="m-12 flex gap-4 items-center">
      <div>付款成功</div>
      <Button onClick={() => navigate("/")}>回首頁</Button>
    </div>
  );
}

export default PaymentResult;
