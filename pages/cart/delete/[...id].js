import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteCart() {
  const [ress, setRess] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    async function deleteCartItem() {
      try {
        const response = await axios.get("/api/cart");
        const filteredRes = response.data.filter((item) => item.id === id[0]);

        if (filteredRes.length > 0) {
          const deletedItemId = filteredRes[0]._id;
          await axios.delete("/api/cart?id=" + deletedItemId);
          await router.push("/cart");
        }
      } catch (error) {
        console.error("Error deleting cart item:", error);
      }
    }

    deleteCartItem();
  }, [id, router]);

  return <Layout />;
}
