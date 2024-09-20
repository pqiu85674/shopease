import axios from "axios";

async function signIn(email, password) {
  try {
    const response = await axios.post("http://localhost:3000/signIn", {
      email,
      password,
    });
    if (response.data.status === "success") {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
}

export default signIn;
