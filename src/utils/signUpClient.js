import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import db from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

async function saveToDatabase(uid, userName, email) {
  console.log("uid", uid);
  console.log("userName", userName);
  console.log("email", email);
  try {
    // 在 "users" 集合中創建新文件，以用戶的 uid 作為文件 ID
    await setDoc(doc(db, "users", uid), {
      userName,
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("儲存用戶資料到 Firestore 時發生錯誤", error);
    throw new Error("儲存用戶資料到 Firestore 時發生錯誤").assign({
      status: "firebase error",
      error,
    });
  }
}

async function signUpClient(userName, email, password) {
  try {
    const auth = getAuth();
    // 創建新用戶
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: userName,
    });
    console.log("user All", user);
    // 獲取 ID Token
    const idToken = await user.getIdToken();
    const uid = user.uid;

    await saveToDatabase(uid, userName, email);

    return { status: "success", message: "註冊成功", idToken, uid };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { status: "error", message: "此電子郵件已經被註冊過" };
    } else if (error.code === "auth/invalid-email") {
      return { status: "error", message: "無效的電子郵件格式" };
    } else if (error.code === "auth/weak-password") {
      return { status: "error", message: "密碼強度不足" };
    } else if (error.status === "firebase error") {
      return { error };
    } else {
      // 對於其他未處理的錯誤，返回通用錯誤信息
      return { status: "error", message: error };
    }
  }
}

export default signUpClient;
