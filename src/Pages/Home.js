import Default from "../components/layout/Default";
import ProductCard from "../components/products/ProductCard";

function Home() {
  return (
    <div>
      <Default>
        <div className="flex flex-wrap ">
          <ProductCard
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            title="title"
            description={{price:"200"}}
            path="p001"
            info="這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊"
          ></ProductCard>
          <ProductCard
            alt="example"
            src="https://mall.ronever.com.tw/upload/product_list_pic_s/twL_product_21I08_Dwd8zjBUAn.jpg"
            title="title"
            description={{price:"300"}}
            path="p002"
            info="這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊，這是產品資訊"
          ></ProductCard>
        </div>
      </Default>
    </div>
  );
}

export default Home;
