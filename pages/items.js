import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Items() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((Response) => {
      setProducts(Response.data);
    });
  }, []);

  return (
    <Layout>
      <div className="bg-white overflow-scroll h-full">
        <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-screen-xl lg:px-8 ">
          <h2 className=" text-5xl mb-6 font-bold">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={"/items/" + product._id}
                className=" bg-gray-200 p-4 rounded-lg group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.base64Image}
                    alt="image uh"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-700">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
