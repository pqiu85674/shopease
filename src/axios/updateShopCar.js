import axios from "axios";

async function updateShopCar(userName, productId, count, size, kind) {
  try {
    const result = await axios.patch("http://localhost:3000/updateShopCar", {
      userName,
      productId,
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
