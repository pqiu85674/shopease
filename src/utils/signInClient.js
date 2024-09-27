import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db from "../firebase/firebase";

async function signInClient(email, password) {
  try {
    const auth = getAuth(db);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const idToken = await user.getIdToken();
    return { status: "success", message: "成功登入", idToken };
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      return { status: "error", message: "密碼錯誤" };
    } else if (error.code === "auth/user-not-found") {
      return { status: "error", message: "帳號不存在" };
    } else {
      return { status: "error", message: error.message };
    }
  }
}

export default signInClient;
