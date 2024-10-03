import axios from "axios";

async function ECPayAxios(order, userUid) {
  const response = await axios.post(`https://server-e6wn.onrender.com/ECPay`, {
    order,
    userUid,
  });
  console.log("ECPayAxios", response.data);
  return response.data;
}

export default ECPayAxios;
