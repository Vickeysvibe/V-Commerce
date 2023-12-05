import { mongooseConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  console.log(method);

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
    try {
      if (req.query?.id) {
        console.log("deleting");
        await Cart.deleteOne({ _id: req.query.id });
        res.json(true);
      }
    } catch {
      console.log("error");
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
