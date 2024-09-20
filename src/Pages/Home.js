import Default from "../components/layout/Default";
import ProductCard from "../components/products/ProductCard";

function Home() {
  return (
    <div>
      <Default>
        <div className="flex flex-wrap ">
          <ProductCard
            alt="example"
            src="https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/black.png?alt=media&token=d30945db-1c9a-4540-8d43-94d74a108e44"
            title="title"
            description={{ price: "200" }}
            path="p001"
            info="這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊"
          ></ProductCard>
          <ProductCard
            alt="example"
            src="https://mall.ronever.com.tw/upload/product_list_pic_s/twL_product_21I08_Dwd8zjBUAn.jpg"
            title="title"
            description={{ price: "300" }}
            path="p002"
            info="這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊"
          ></ProductCard>
          <ProductCard
            alt="example"
            src="https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-09-20%20101757.png?alt=media&token=f41f1fb5-88f0-462f-8842-e924e91f6dac"
            title="title"
            description={{ price: "300" }}
            path="p002"
            info="這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊"
          ></ProductCard>
        </div>
      </Default>
    </div>
  );
}

export default Home;
