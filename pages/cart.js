import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

/*.then(async (Response) => {
      const res = await Response.data.filter((res) => {
        return res.id === fid;
      });
      await setRess(res);
      console.log(res);
      console.log(ress);
    });*/

export default function Cart() {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [cost, setCost] = useState("");
  const [ress, setRess] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const cartResponse = await axios.get("/api/cart");
      const cartRes1 = await cartResponse.data.filter(
        (items) => items.user === session.user.email && items.cart === "cart"
      );

      console.log(cartRes1);

      const prodResponse = await axios.get("/api/products");

      let tempLikes = [];

      await Promise.all(
        cartRes1.map(async (cart) => {
          const prod1 = await prodResponse.data.find(
            (prods) => prods._id === cart.id
          );
          if (prod1) {
            tempLikes.push(prod1);
          }
        })
      );

      await setCart(tempLikes);
      console.log(cart);
      console.log(tempLikes);

      await setCost(cart.reduce((acc, cart) => acc + cart.price, 0));
      console.log(cost);
    };

    fetchData();
  }, []);
  useEffect(() => {
    setCost(cart.reduce((acc, cartItem) => acc + cartItem.price, 0));
  }, [cart]);

  return (
    <Layout>
      <>
        <div class=" bg-white pt-20">
          <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3">
              {cart.map((cart) => (
                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start">
                  <img
                    src={cart.base64Image}
                    alt="product-image"
                    class="w-full rounded-lg sm:w-40"
                  />
                  <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div class="mt-5 sm:mt-0">
                      <h2 class="text-2xl font-bold text-gray-900">
                        {cart.name}
                      </h2>
                      <p class="mt-1 text-xs text-gray-700">3{cart.catagory}</p>
                    </div>
                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div class="flex items-center space-x-4">
                        <p class="text-xl">${cart.price}</p>
                        <Link href={"/cart/delete/" + cart._id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div class="mb-2 flex justify-between">
                <p class="text-gray-700">Subtotal</p>
                <p class="text-gray-700">${cost}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-gray-700">Shipping</p>
                <p class="text-gray-700">{cost && 49}</p>
              </div>
              <hr class="my-4" />
              <div class="flex justify-between">
                <p class="text-lg font-bold">Total</p>
                <div class="">
                  <p class="mb-1 text-lg font-bold">${cost + cost ? 49 : 0}</p>
                  <p class="text-sm text-gray-700">including GST</p>
                </div>
              </div>
              <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
