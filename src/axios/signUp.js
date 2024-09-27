import axios from "axios";

async function signUp(email, password, userName) {
  try {
    const response = await axios.post("https://server-9atm.onrender.com/signUp", {
      email,
      password,
      userName,
    });
    return response;
  } catch (err) {
    console.error("請求失敗:", err);
    throw err; // 抛出錯誤以便外部函式捕捉
  }
}

export default signUp;
