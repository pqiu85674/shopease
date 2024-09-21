import axios from "axios";

async function addShopCar(userName, productId, count, size, kind) {
  const result = await axios.post("http://localhost:3000/addShopCar", {
    userName,
    productId,
    count,
    size,
    kind,
  });
  console.log(result);
}

export default addShopCar;
