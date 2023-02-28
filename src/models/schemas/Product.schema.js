const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  cant: { type: String },
  updatedAt: { type: Date },
});
