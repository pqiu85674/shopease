import axios from "axios";

async function deleteShopCar(userName, product) {
  await axios.delete("http://localhost:3000/deleteShopCar", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName,
      product,
    },
  });
}

export default deleteShopCar;
