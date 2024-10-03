import axios from "axios";

async function deleteShopCar(userUid, product) {
  await axios.delete(`https://server-e6wn.onrender.com/deleteShopCar`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userUid,
      product,
    },
  });
}

export default deleteShopCar;
