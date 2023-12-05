import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

export default function Details() {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [apcart, setApcart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const cartResponse = await axios.get("/api/cart");
      const cartRes1 = await cartResponse.data.filter(
        (items) => items.user === session.user.email && items.cart === "cart"
      );

      console.log(cartRes1);
      setApcart(cartRes1);

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
    };

    fetchData();
  }, []);
  const [name, setName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [address, setAddress] = useState();

  async function createAddress(e) {
    e.preventDefault();

    await Promise.all(
      cart.map(async (cartItem) => {
        const { _id, mail } = cartItem;

        await axios.post("/api/order", {
          prodId: _id,
          buyer: session.user.email,
          seller: mail,
          orderStatus: "waiting",
          address,
          phoneNo,
          name,
        });
      })
    );

    await Promise.all(
      apcart.map(async (cartItem) => {
        await axios.delete("/api/cart?id=" + cartItem._id);
      })
    );

    setName("");
    setPhoneNo("");
    setAddress("");
    alert("Order successfully placed");
    router.push("/cart");
  }

  return (
    <Layout>
      <div style={{ height: "750px" }} className=" overflow-scroll">
        {cart.map((cart) => (
          <div class="justify-between mx-48 mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start">
            <img
              src={cart.base64Image}
              alt="product-image"
              class="w-full rounded-lg sm:w-40"
            />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div class="mt-5 sm:mt-0">
                <h2 class="text-2xl font-bold text-gray-900">{cart.name}</h2>
                <p class="mt-1 text-xs text-gray-700">{cart.catagory}</p>
              </div>
              <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div class="flex items-center space-x-4">
                  <p class="text-xl">${cart.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className=" px-32 py-28">
          <h1 className=" text-5xl mb-10">Add address</h1>
          <form className="flex flex-col gap-3" onSubmit={createAddress}>
            <label className="text-lg">Name</label>
            <input
              style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              className=" h-15 p-4"
              type="text"
            />
            <label className="text-lg">phone number</label>
            <input
              style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
              value={phoneNo}
              onChange={(ev) => {
                setPhoneNo(ev.target.value);
              }}
              className=" h-15 p-4"
              type="text"
            />
            <label className="text-lg">address</label>
            <input
              style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
              className=" h-15 p-4"
              value={address}
              onChange={(ev) => {
                setAddress(ev.target.value);
              }}
              type="text"
            />
            <button
              type="submit"
              className=" mt-8 w-32 p-3 rounded-lg text-center text-white bg-blue-900"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
