import axios from "axios";
async function getProducts() {
  const response = await axios.get(`${process.env.REACT_APP_Render}/getProducts`);
  return response;
}

export default getProducts;
