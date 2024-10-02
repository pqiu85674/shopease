import Default from "../components/layout/Default";

function Account() {
  return (
    <Default>
      <div>
        <div className="flex justify-center">
          <div>使用者名稱：</div>
          <div>-----</div>
        </div>
        <div className="flex justify-center">
          <div>email：</div>
          <div>-----</div>
        </div>
        <div className="flex justify-center">
          <div>註冊日期：</div>
          <div>-----</div>
        </div>
      </div>
    </Default>
  );
}

export default Account;
