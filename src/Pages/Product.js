import { useLocation } from "react-router-dom";
import React from "react";
import Default from "../components/layout/Default";
import ProductInfo from "../components/products/ProductInfo";

function Product() {
  const location = useLocation();
  const {
    productId,
    src,
    title,
    price,
    alt,
    size,
    kind,
    customerSize,
    customerKind,
    customerCount,
  } = location.state || {};

  return (
    <Default>
      <ProductInfo
        productId={productId}
        src={src}
        title={title}
        price={price}
        alt={alt}
        size={size}
        kind={kind}
        customerSize={customerSize}
        customerKind={customerKind}
        customerCount={customerCount}
      />
    </Default>
  );
}

export default Product;
