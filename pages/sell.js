import Layout from "@/components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Sell() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [productrs, setProductrs] = useState([]);
  const temp = [];
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const allProducts = response.data;
        const userProducts = allProducts.filter(
          (product) => product.mail === session.user.email
        );
        setProducts(userProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [session.user.email]);

  return (
    <Layout>
      <div>
        <Link
          href={"/products/new"}
          className="p-3 rounded-lg text-center text-white bg-blue-900"
        >
          Add products
        </Link>

        <div class="relative overflow-x-auto mt-10 rounded-xl">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  catagory
                </th>
                <th scope="col" class="px-6 py-3">
                  price
                </th>
                <th scope="col" class="px-6 py-3">
                  options
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td class="px-6 py-4">{product.catagory}</td>
                  <td class="px-6 py-4">{product.price}</td>
                  <td class="px-6 py-4">
                    <div className=" flex gap-3">
                      <Link
                        className=" p-3 rounded-lg text-center text-white bg-blue-900"
                        href={"/products/edit/" + product._id}
                      >
                        edit
                      </Link>
                      <Link
                        className="p-3 rounded-lg text-center text-white bg-blue-900 "
                        href={"/products/delete/" + product._id}
                      >
                        delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
