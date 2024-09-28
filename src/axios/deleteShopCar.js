import axios from "axios";

async function deleteShopCar(userUid, product) {
  await axios.delete("http://localhost:3000/deleteShopCar", {
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
