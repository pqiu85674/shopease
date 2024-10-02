import axios from "axios";

async function ECPayAxios(order, userUid) {
  const response = await axios.post(`${process.env.REACT_APP_Render}/ECPay`, {
    order,
    userUid,
  });
  console.log("ECPayAxios", response.data);
  return response.data;
}

export default ECPayAxios;
