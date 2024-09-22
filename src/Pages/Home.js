import Default from "../components/layout/Default";
import React from "react";
import ProductCard from "../components/products/ProductCard";
import { useRecoilValue } from "recoil";
import { AtomGetAllProductsFromFirebase } from "../Recoil/Atom";

function Home() {
  const products = useRecoilValue(AtomGetAllProductsFromFirebase);
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
                kind={product.kind}
              />
            );
          })}
        </div>
      </Default>
    </div>
  );
}

export default Home;
