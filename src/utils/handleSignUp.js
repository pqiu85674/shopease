import signUpClient from "./signUpClient";

async function handleSignUp(
  userName,
  email,
  password,
  confirmPassword,
  setUserUid,
  setUserName,
  setEmail,
  setIsMember,
  setPassword,
  setConfirmPassword,
  navigate
) {
  if (password !== confirmPassword) {
    alert("兩次密碼輸入不一致");
    setPassword("");
    setConfirmPassword("");
  } else if (password === confirmPassword) {
    try {
      const signUpClientResponse = await signUpClient(
        userName,
        email,
        password
      );
      if (signUpClientResponse.status === "success") {
        alert("成功註冊");
        setUserUid(signUpClientResponse.uid);
        setIsMember(true);
        navigate("/");
      } else if (signUpClientResponse.message === "此電子郵件已經被註冊過") {
        alert(signUpClientResponse.message);
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else if (signUpClientResponse.message === "無效的電子郵件格式") {
        alert(signUpClientResponse.message);
        setEmail("");
      } else if (signUpClientResponse.message === "密碼強度不足") {
        alert(signUpClientResponse.message);
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("其他錯誤");
        console.log("其他錯誤", signUpClientResponse);
      }
    } catch (error) {
      console.error("請求失敗:", error);
      alert("發生錯誤，請稍後再試");
    }
  }
}

export default handleSignUp;
