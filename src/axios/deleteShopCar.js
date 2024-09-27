import axios from "axios";

async function deleteShopCar(userName, product) {
  await axios.delete("https://server-9atm.onrender.com/deleteShopCar", {
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
