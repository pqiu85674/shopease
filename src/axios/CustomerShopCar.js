import axios from "axios";

async function customerShopCar(userUid) {
  const result = await axios.post("https://server-e6wn.onrender.com/customerShopCar", {
    userUid,
  });
  return result.data;
}

export default customerShopCar;
