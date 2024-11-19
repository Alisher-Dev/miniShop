import { useEffect, useState } from "react";
import { Corusel } from "./corusel";
import { Product } from "./product-cart";
import { IProduct } from "../types";
import { api } from "../api/axios";
import { urls } from "../api/urls";

export function Main() {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    api(urls.product.get)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);

  if (!data) return <p>loading ...</p>;

  return (
    <div>
      <Corusel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-5 px-5">
        {data.map((el, index) => (
          <Product key={index} product={el} />
        ))}
      </div>
    </div>
  );
}
