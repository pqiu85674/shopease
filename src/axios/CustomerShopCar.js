import axios from "axios";

async function customerShopCar(userUid) {
  const result = await axios.post("http://localhost:3000/customerShopCar", {
    userUid,
  });
  return result;
}

export default customerShopCar;
