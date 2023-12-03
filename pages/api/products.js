import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const { name, disc, base64Image, price, catagory, _id } = req.body;
    await Product.updateOne(
      { _id },
      { name, disc, base64Image, price, catagory }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }

  if (method === "POST") {
    const { name, disc, base64Image, price, catagory, mail } = req.body;
    const productDoc = await Product.create({
      name,
      disc,
      base64Image,
      catagory,
      price,
      mail,
      user: "none",
    });
    res.json(productDoc);
  }
}
