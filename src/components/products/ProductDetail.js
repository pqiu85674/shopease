import RowAndCol from "../common/RowAndCol";
import StyledCard from "../common/StyledCard";

function ProductDetail({ checked, shopCar, AllProducts }) {
  return shopCar.map((product) => {
    // console.log(product)
    return AllProducts.map((AllProduct, index) => {
      if (AllProduct.id === product.productId) {
        const index = checked.indexOf(product.productId);
        if (index > -1) {
          return (
            <RowAndCol
              col2={
                <div className="w-full h-full">
                  <StyledCard src={AllProduct.src[0]} />
                </div>
              }
              col3={<div>{AllProduct.title}</div>}
              col4={<div>{product.kind ? product.kind : "-"}</div>}
              col5={<div>{product.size ? product.size : "-"}</div>}
              col6={<div>{product.price}</div>}
              col7={<div>{product.count}</div>}
              col8={<div>{product.price * product.count}</div>}
            />
          );
        }
      }
      return null;
    });
  });
}

export default ProductDetail;
