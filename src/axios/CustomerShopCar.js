import axios from "axios";

async function customerShopCar(userName) {
  const result = await axios.post("http://localhost:3000/customerShopCar", {
    userName,
  });
  return result;
}

export default customerShopCar;
