import axios from "axios";

async function customerShopCar(userName) {
  const result = await axios.post("https://server-9atm.onrender.com/customerShopCar", {
    userName,
  });
  return result;
}

export default customerShopCar;
