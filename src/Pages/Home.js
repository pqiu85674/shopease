import Default from "../components/layout/Default";
import getProducts from "../axios/getProducts";
import React from "react";
import ProductCard from "../components/products/ProductCard";
import { useRecoilValue } from "recoil";
import { AtomProducts } from "../Recoil/Atom";

function Home() {
  const products = useRecoilValue(AtomProducts);
  return (
    <div>
      <Default>
        <div className="flex flex-wrap ">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                productId={product.id}
                src={product.src}
                title={product.title}
                price={product.price}
                alt={product.alt}
                size={product.size}
              />
            );
          })}
        </div>
      </Default>
    </div>
  );
}

export default Home;
