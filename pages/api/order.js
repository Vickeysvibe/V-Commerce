import { mongooseConnect } from "@/lib/mongoose";
import { Orders } from "@/models/orders";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method, body } = req;

  if (method === "POST") {
    try {
      const { prodId, buyer, seller, orderStatus, address, name, phoneNo } =
        body;

      const order = await Orders.create({
        prodId,
        buyer,
        seller,
        orderStatus,
        address,
        name,
        phoneNo,
      });

      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Orders.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
  if (method === "GET") {
    res.json(await Orders.find());
  }
}
