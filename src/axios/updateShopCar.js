import axios from "axios";

async function updateShopCar(userName, productId, price, count, size, kind) {
  try {
    const result = await axios.patch("https://server-9atm.onrender.com/updateShopCar", {
      userName,
      productId,
      price,
      count,
      size,
      kind,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default updateShopCar;
