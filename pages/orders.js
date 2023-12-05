import Layout from "@/components/layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Orders() {
  const [order, setOrder] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const orderResponse = await axios.get("/api/order");
      const orderRes1 = await orderResponse.data.filter(
        (items) => items.buyer === session.user.email
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
      <div className="h-full overflow-x-hidden overflow-y-scroll">
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col ">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
              Orders
            </h1>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                  Current orders
                </p>
                {order.map((order) => (
                  <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={order.base64Image}
                        alt="dress"
                      />
                      <img
                        className="w-full md:hidden"
                        src={order.base64Image}
                        alt="dress"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          {order.name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">catagoy: </span>
                            {order.catagory}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          Status : {order.status}{" "}
                        </p>

                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                          {order.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
