import Layout from "@/components/layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function SellerOrders() {
  const [order, setOrder] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
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
            prod1.orderId = order._id;
            prod1.buyer = order.buyer;
            prod1.address = order.phoneNo + " , " + order.address;
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
  async function doApprove(id) {
    console.log("running");
    const data = { orderStatus: "approved", id: id };
    await axios.put("/api/order", data);
    router.push("/");
  }
  async function doShip(id) {
    console.log("running");
    const data = { orderStatus: "shipped", id: id };
    await axios.put("/api/order", data);
    router.push("/");
  }
  async function doOut(id) {
    console.log("running");
    const data = { orderStatus: "out for delivery", id: id };
    await axios.put("/api/order", data);
    router.push("/");
  }
  async function doDel(id) {
    console.log("running");
    const data = { orderStatus: "delivered", id: id };
    await axios.put("/api/order", data);
    router.push("/");
  }
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
              <td class="px-6 py-4">{product.buyer}</td>
              <td class="px-6 py-4">{product.address}</td>
              <td class="px-6 py-4">
                <div className=" flex gap-3">
                  {product.status === "waiting" ? (
                    <button
                      onClick={() => {
                        doApprove(product.orderId);
                      }}
                      className="w-32 p-3 rounded-lg text-center text-white bg-blue-900"
                    >
                      approve
                    </button>
                  ) : product.status === "approved" ? (
                    <button
                      onClick={() => {
                        {
                          doShip(product.orderId);
                        }
                      }}
                      className="w-32 p-3 rounded-lg text-center text-white bg-blue-900"
                    >
                      Shipped
                    </button>
                  ) : product.status === "shipped" ? (
                    <button
                      onClick={() => {
                        {
                          doOut(product.orderId);
                        }
                      }}
                      className="w-32 p-3 rounded-lg text-center text-white bg-blue-900"
                    >
                      out for delivery
                    </button>
                  ) : product.status === "out for delivery" ? (
                    <button
                      onClick={() => {
                        {
                          doDel(product.orderId);
                        }
                      }}
                      className="w-32 p-3 rounded-lg text-center text-white bg-blue-900"
                    >
                      delivered
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
