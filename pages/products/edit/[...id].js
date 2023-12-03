import Layout from "@/components/layout";
import Table from "@/components/table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

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
        console.log(Response.data);
        setProductInfo(Response.data);
      });
    }, [id]);
    console.log(productInfo);
  }
  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo ? <Table {...productInfo} /> : <h1>illai</h1>}
    </Layout>
  );
}
