import axios from "axios";

async function updateShopCar(userUid, productId, price, count, size, kind) {
  try {
    const result = await axios.patch(
      "http://localhost:3000/updateShopCar",
      {
        userUid,
        productId,
        price,
        count,
        size,
        kind,
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default updateShopCar;
