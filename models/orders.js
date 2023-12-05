const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
  prodId: { type: String, required: true },
  buyer: { type: String, required: true },
  seller: { type: String, required: true },
  orderStatus: { type: String, required: true },
  address: { type: String, required: true },
  phoneNo: { type: String, required: true },
  name: { type: String, required: true },
});

export const Orders = models.Orders || model("Orders", OrderSchema);
