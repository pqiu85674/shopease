import axios from "axios";

async function signIn(idToken) {
  try {
    const response = await axios.post("https://server-e6wn.onrender.com/signIn", {
      idToken,
    });
    return response.data;
  } catch (error) {
    console.log("signIn errrrr", error);
    return error;
  }
}

export default signIn;
