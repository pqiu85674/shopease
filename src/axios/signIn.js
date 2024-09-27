import axios from "axios";

async function signIn(idToken) {
  try {
    const response = await axios.post("https://server-9atm.onrender.com/signIn", {
      idToken,
    });
    return response.data;
  } catch (error) {
    console.log("signIn errrrr", error);
    return error;
  }
}

export default signIn;
