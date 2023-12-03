const { Schema, model, models } = require("mongoose");

const CartSchema = new Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  cart: { type: String, required: true },
});

export const Cart = models.Cart || model("Cart", CartSchema);
