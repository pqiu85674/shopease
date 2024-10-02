import axios from "axios";

async function customerShopCar(userUid) {
  const result = await axios.post(
    `${process.env.REACT_APP_Render}/customerShopCar`,
    {
      userUid,
    }
  );
  return result.data;
}

export default customerShopCar;
