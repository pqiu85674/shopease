import { Col, Row } from "antd";

function RowAndCol({ col1, col2, col3, col4, col5, col6, col7, col8 }) {
  return (
    <Row className="bg-neutral-200 my-4 py-4">
      <Col span={2} className="flex items-center justify-center text-lg">{col1}</Col>
      <Col span={2} className="flex items-center justify-center text-lg">{col2}</Col>
      <Col span={9} className="flex items-center justify-center text-lg">{col3}</Col>
      <Col span={2} className="flex items-center justify-center text-lg">{col4}</Col>
      <Col span={2} className="flex items-center justify-center text-lg">{col5}</Col>
      <Col span={2} className="flex items-center justify-center text-lg">{col6}</Col>
      <Col span={2} className="flex items-center justify-center text-lg">{col7}</Col>
      <Col span={2} className="flex items-center justify-center text-lg">{col8}</Col>
      <Col span={1} className="flex items-center justify-center text-lg"></Col>
    </Row>
  );
}

export default RowAndCol;
