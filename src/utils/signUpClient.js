import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import db from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

async function saveToDatabase(uid, userName, email) {
  try {
    await setDoc(doc(db, "users", uid), {
      userName,
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("儲存用戶資料到 Firestore 時發生錯誤", error);
  }
}

async function signUpClient(userName, email, password) {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: userName,
    });
    
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
      return { status: "error", message: error };
    }
  }
}

export default signUpClient;
