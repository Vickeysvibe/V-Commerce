const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  disc: { type: String, required: true },
  base64Image: { type: String, required: true },
  price: { type: Number, required: true },
  mail: { type: String, required: true },
  catagory: { type: String, required: true },
});

export const Product = models.Product || model("Product", ProductSchema);
