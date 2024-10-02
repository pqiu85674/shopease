import axios from "axios";

async function deleteShopCar(userUid, product) {
  await axios.delete(`${process.env.REACT_APP_Render}/deleteShopCar`, {
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
