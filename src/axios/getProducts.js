import axios from "axios";
async function getProducts() {
  const response = await axios.get(`https://server-e6wn.onrender.com/getProducts`);
  return response;
}

export default getProducts;
