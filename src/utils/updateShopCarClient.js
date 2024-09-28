import customerShopCar from "../axios/customerShopCar";

async function updateShopCarClient(userUid, setShopCar) {
  const products = await customerShopCar(userUid);
  let result = [];
  Object.values(products.data).forEach((product) => result.push(product));
  setShopCar(result);
}

export default updateShopCarClient;
