import signInClient from "./signInClient";
import signIn from "../axios/signIn";

async function handleSignIn(
  email,
  password,
  setIsMember,
  setUserUid,
  setEmail,
  setUserName,
  setPassword,
  navigate
) {
  try {
    const response = await signInClient(email, password);
    if (response.status === "success") {
      const result = await signIn(response.idToken);
      if (result.status === "success") {
        setUserUid(result.uid);
        alert(result.message);
        setIsMember(true);
        setUserName(result.userName);
        navigate("/");
      } else {
        alert("您還不是會員，請先註冊");
        navigate("/signUp");
      }
    } else if (response.message === "密碼錯誤") {
      alert(response.message);
      setPassword("");
    } else if (response.message === "帳號不存在") {
      alert(response.message);
      setEmail("");
      setPassword("");
    } else if (response.message === "無效的憑證") {
      alert(response.message);
      setEmail("");
      setPassword("");
    } else {
      alert("其他錯誤");
      console.log("其他錯誤", response.message);
      setEmail("");
      setPassword("");
    }
  } catch (error) {
    console.log(error);
  }
}

export default handleSignIn;
