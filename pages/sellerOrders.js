import Layout from "@/components/layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function SellerOrders() {
  const [order, setOrder] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const orderResponse = await axios.get("/api/order");
      console.log(orderResponse);
      const orderRes1 = await orderResponse.data.filter(
        (items) => items.seller === session.user.email
      );

      console.log(orderRes1);

      const prodResponse = await axios.get("/api/products");

      let tempLikes = [];

      await Promise.all(
        orderRes1.map(async (order) => {
          const prod1 = await prodResponse.data.find(
            (prods) => prods._id === order.prodId
          );
          if (prod1) {
            prod1.status = order.orderStatus;
            tempLikes.push(prod1);
          }
        })
      );

      await setOrder(tempLikes);
      console.log(order);
      console.log(tempLikes);
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product name
            </th>
            <th scope="col" class="px-6 py-3">
              buyer
            </th>
            <th scope="col" class="px-6 py-3">
              address
            </th>
            <th scope="col" class="px-6 py-3">
              options
            </th>
          </tr>
        </thead>
        <tbody>
          {order.map((product) => (
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
    </Layout>
  );
}
