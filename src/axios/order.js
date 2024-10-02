import axios from "axios";

async function order(userUid) {
  const response = await axios.post(`${process.env.REACT_APP_Render}/order`, {
    userUid,
  });

  if (response.data.status === "success") {
    return response.data;
  } else {
    return null;
  }
}

export default order;
