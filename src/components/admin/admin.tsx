import { useNavigate } from "react-router-dom";
import { FindStorage } from "../helpers/storage";
import { useEffect, useState } from "react";
import { IProduct } from "../types";
import { api } from "../api/axios";
import { urls } from "../api/urls";
import { Product } from "../main/product-cart";
import { CreateProduct } from "./createProduct";

export function Admin() {
  const admin = FindStorage("admin");
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/admin");
    }
  }, [admin]);

  if (!admin) {
    return null;
  }

  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    api(urls.product.get)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);

  if (!data) return <p>loading ...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-bold">admin</p>
        <CreateProduct />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-5 px-5">
        {data.map((el, index) => (
          <Product admin key={index} product={el} />
        ))}
      </div>
    </div>
  );
}
