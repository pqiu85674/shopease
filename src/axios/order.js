import axios from "axios";

async function order(userUid) {
  const response = await axios.post(`https://server-e6wn.onrender.com/order`, {
    userUid,
  });

  if (response.data.status === "success") {
    return response.data;
  } else {
    return null;
  }
}

export default order;
