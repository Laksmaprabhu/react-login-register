// models/Order.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    product: String,
    amount: Number
},
{
    collection: "orders" // your collection name
});

export default mongoose.model("Order", orderSchema);