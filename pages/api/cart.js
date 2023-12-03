import { mongooseConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    console.log(req.body);
    const { id, user, cart } = req.body;
    const cartDoc = await Cart.create({
      id,
      cart,
      user,
    });
    res.json(cartDoc);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Cart.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Cart.findOne({ _id: req.query.id }));
    } else {
      res.json(await Cart.find());
    }
  }
}
