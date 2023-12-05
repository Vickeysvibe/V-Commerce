import Layout from "@/components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

/*
          <label className="text-lg">
            {" "}
            Product images
            {base64Image ? (
              <div>
                <img src={base64Image} className="w-32 h-32" />
                <input
                  className=" h-15 hidden cursor-pointer"
                  type="file"
                  onChange={handleImageInputChange}
                />
              </div>
            ) : (
              <div className=" w-32 h-32 bg-gray-400  cursor-pointer flex justify-center items-center ">
                upload images
                <input
                  className=" h-15 hidden cursor-pointer"
                  type="file"
                  onChange={handleImageInputChange}
                />
              </div>
            )}
          </label>
          */

export default function Table({
  _id,
  name: Pname,
  disc: Pdisc,
  price: Pprice,
  base64Image: Pbase64Image,
  catagory: Pcatagory,
}) {
  const { data: session } = useSession();
  const [name, setName] = useState(Pname || "");
  const [disc, setDisc] = useState(Pdisc || "");
  const [price, setPrice] = useState(Pprice || "");
  const [catagory, setCatagory] = useState(Pcatagory || "");
  const [goback, setGoback] = useState(false);
  const [base64Image, setBase64Image] = useState(Pbase64Image || "");
  const router = useRouter();
  const mail = session.user.email;
  console.log(_id);

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result;
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  async function createProduct(e) {
    e.preventDefault();
    const data = { name, disc, base64Image, price, catagory, mail };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoback(true);
  }
  if (goback) {
    router.push("/sell");
  }

  return (
    <>
      <div className=" overflow-scroll px-32 py-28">
        <h1 className=" text-5xl mb-10">Add a new product</h1>
        <form className="flex flex-col gap-3" onSubmit={createProduct}>
          <label className="text-lg">Name of the product</label>
          <input
            style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            className=" h-15 p-4"
            type="text"
          />
          <label className="text-lg">Catagory</label>
          <input
            style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
            value={catagory}
            onChange={(ev) => {
              setCatagory(ev.target.value);
            }}
            className=" h-15 p-4"
            type="text"
          />
          <label className="text-lg">product discription</label>
          <input
            style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
            className=" h-15 p-4"
            value={disc}
            onChange={(ev) => {
              setDisc(ev.target.value);
            }}
            type="text"
          />
          <label className="text-lg">product image link</label>
          <input
            style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
            className=" h-15 p-4"
            value={base64Image}
            onChange={(ev) => {
              setBase64Image(ev.target.value);
            }}
            type="text"
          />

          <label className="text-lg">Price</label>
          <input
            style={{ border: "solid .2rem #111827", borderRadius: "10px" }}
            value={price}
            onChange={(ev) => {
              setPrice(ev.target.value);
            }}
            className=" h-15 p-4"
            type="number"
          />
          <button
            type="submit"
            className=" mt-8 w-32 p-3 rounded-lg text-center text-white bg-blue-900"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
