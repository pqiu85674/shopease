import axios from "axios";

async function signIn(idToken) {
  try {
    const response = await axios.post("http://localhost:3000/signIn", {
      idToken,
    });
    return response.data;
  } catch (error) {
    console.log("signIn errrrr", error);
    return error;
  }
}

export default signIn;
