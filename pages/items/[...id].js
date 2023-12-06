import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function prodPage() {
  const [productInfo, setProductInfo] = useState("");
  const [cart, setCart] = useState("");
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  const { data: session } = useSession();
  const user = session?.user?.email;
  if (!id) {
    return;
  } else {
    useEffect(() => {
      axios.get("/api/products?id=" + id).then((Response) => {
        setProductInfo(Response.data);
      });
    }, [id]);
    console.log(productInfo);
  }
  const dashed = productInfo.price + 200;

  const addToCart = async () => {
    const cart = "cart";
    const data = { id: productInfo._id, user, cart };
    await axios.post("/api/cart", data);
    alert(productInfo.name + " has been added to cart");
  };
  const addToLikes = async () => {
    const cart = "like";
    const data = { id: productInfo._id, user, cart };
    await axios.post("/api/cart", data);
    alert(productInfo.name + " has been added to Likes");
  };
  if (session) {
    return (
      <Layout>
        <section class=" h-full bg-white  py-11  font-poppins">
          <div
            class="h-full px-10 py-4 mx-auto lg:py-8 md:px-6 overflow-y-scroll"
            style={{ maxWidth: "1200px" }}
          >
            <div class="flex flex-wrap -mx-4">
              <div class="w-full px-4 md:w-1/2 ">
                <div class="sticky top-0 z-50 overflow-hidden ">
                  <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
                    <img
                      src={productInfo.base64Image}
                      alt=""
                      class="object-cover w-full lg:h-full "
                    />
                  </div>
                </div>
              </div>
              <div class="w-full pt-10 px-4 md:w-1/2 ">
                <div class="lg:pl-20">
                  <div class="mb-8 ">
                    <span class="text-lg font-medium text-rose-500 dark:text-rose-900">
                      New
                    </span>
                    <h2 class="max-w-xl mt-2 mb-6 text-5xl font-bold dark:text-gray-900 md:text-4xl">
                      {productInfo.name}
                    </h2>
                    <p class="max-w-md mb-8 text-gray-700 dark:text-gray-900">
                      {productInfo.disc}
                    </p>
                    <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-900 ">
                      <span>${productInfo.price}</span>
                      <span class="text-base font-normal text-gray-500 line-through dark:text-gray-900">
                        {dashed}
                      </span>
                    </p>
                    <p class="text-green-600 dark:text-green-900 ">
                      7 in stock
                    </p>
                  </div>
                  <div class="w-32 mb-8 ">
                    <label
                      for=""
                      class="w-full text-xl font-semibold text-gray-700 dark:text-gray-900"
                    >
                      Quantity
                    </label>
                    <div class="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                      <button class="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-200 dark:text-gray-900 dark:bg-gray-100 hover:text-gray-700 hover:bg-gray-200">
                        <span class="m-auto text-2xl font-thin">-</span>
                      </button>
                      <input
                        type="number"
                        class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-1x00 focus:outline-none text-md hover:text-black"
                        placeholder="1"
                      />
                      <button class="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-200 dark:text-gray-900 dark:bg-gray-100 hover:text-gray-700 hover:bg-gray-200">
                        <span class="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>
                  <div class="flex flex-wrap items-center -mx-4 ">
                    <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                      <button
                        onClick={addToCart}
                        class="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div class="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                      <button
                        onClick={addToLikes}
                        class="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                      >
                        Add to wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
