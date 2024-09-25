import StyledCard from "../common/StyledCard";
import ProductContainer from "./ProductContainer";

function ProductDetail({ checked, shopCar, AllProducts }) {
  return shopCar.map((product) => {
    // console.log(product)
    return AllProducts.map((AllProduct, index) => {
      if (AllProduct.id === product.productId) {
        const index = checked.indexOf(product.productId);
        if (index > -1) {
          return (
            <ProductContainer key={index}>
              <div className="w-16">
                <StyledCard src={AllProduct.src[0]} />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-14 md:w-16 lg:w-20">
                  {product.kind ? product.kind : "-"}
                </div>
                <div className="w-14 md:w-16 lg:w-20">
                  {product.size ? product.size : "-"}
                </div>
                <div className="w-14 md:w-16 lg:w-20">{product.price}</div>
                <div className="w-14 md:w-16 lg:w-20">{product.count}</div>
                <div className="w-14 md:w-16 lg:w-20 text-red-500">
                  {product.price * product.count}
                </div>
              </div>
            </ProductContainer>
          );
        }
      }
      return null;
    });
  });
}

export default ProductDetail;
