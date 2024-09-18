import axios from "axios";

async function signUp(email, password, userName) {
  try {
    const response = await axios.post("http://localhost:3000/signUp", {
      email,
      password,
      userName,
    });
    console.log(response);
    if (response.data.status === "success") {
      return "success";
    } else if (response.data.status === "auth/email-already-in-use") {
      return "auth/email-already-in-use";
    } else if (response.data.status === "auth / weak - password") {
      return "auth / weak - password";
    } else {
      return response.data.status;
    }
  } catch (err) {
    console.error("請求失敗:", err);
    throw err; // 抛出錯誤以便外部函式捕捉
  }
}

export default signUp;
