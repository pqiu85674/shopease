import axios from "axios";
async function getProducts() {
  const response = await axios.get("http://localhost:3000/getProducts");
  return response;
}

export default getProducts;
