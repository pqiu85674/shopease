import Default from "../components/layout/Default";
import React from "react";
import ProductCard from "../components/products/ProductCard";
import { useRecoilValue } from "recoil";
import { AtomGetAllProductsFromFirebase } from "../Recoil/Atom";
import { useLocation } from "react-router-dom";
import PopupModal from "../components/common/PopupModal";

function Home() {
  const AllProducts = useRecoilValue(AtomGetAllProductsFromFirebase);

  const location = useLocation();

  const search = location.state?.search || "";
  return (
    <div>
      <PopupModal />
      <Default>
        <div className="flex flex-wrap ">
          {AllProducts.map((AllProduct) => {
            if (search === "") {
              return (
                <ProductCard
                  key={AllProduct.id}
                  productId={AllProduct.id}
                  src={AllProduct.src}
                  title={AllProduct.title}
                  price={AllProduct.price}
                  alt={AllProduct.alt}
                  size={AllProduct.size}
                  kind={AllProduct.kind}
                />
              );
            } else {
              if (AllProduct.title.indexOf(search) > -1) {
                return (
                  <ProductCard
                    key={AllProduct.id}
                    productId={AllProduct.id}
                    src={AllProduct.src}
                    title={AllProduct.title}
                    price={AllProduct.price}
                    alt={AllProduct.alt}
                    size={AllProduct.size}
                    kind={AllProduct.kind}
                  />
                );
              }
            }
            return null;
          })}
        </div>
      </Default>
    </div>
  );
}

export default Home;
