import customerShopCar from "../axios/customerShopCar";

async function updateShopCarClient(userName, setShopCar) {
  const products = await customerShopCar(userName);
  let result = [];
  Object.values(products.data).forEach((product) => result.push(product));
  setShopCar(result);
}

export default updateShopCarClient;
