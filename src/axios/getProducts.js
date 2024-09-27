import axios from "axios";
async function getProducts() {
  const response = await axios.get("https://server-9atm.onrender.com/getProducts");
  return response;
}

export default getProducts;
