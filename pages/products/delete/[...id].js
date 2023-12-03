import Layout from "@/components/layout";
import Table from "@/components/table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState("");
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
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
  const goBack = () => {
    router.push("/sell");
  };

  const deleteProduct = () => {
    axios.delete("/api/products?id=" + id);
    goBack();
  };
  return (
    <Layout>
      <h1 className=" mb-5 text-4xl">
        Do you really want to delete the product "{productInfo.name}"
      </h1>
      <div className="flex gap-3 mt-5">
        <button
          onClick={deleteProduct()}
          className="px-4 py-1  rounded-md bg-red-800 text-white text-xl"
        >
          yes
        </button>
        <button
          onClick={goBack()}
          className="px-4 py-1 rounded-md bg-gray-600 text-white text-xl"
        >
          no
        </button>
      </div>
    </Layout>
  );
}
