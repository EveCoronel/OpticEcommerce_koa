const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    orderNumber: { type: Number },
    products: [{ type: Object }],
    state: { type: String },
    email: { type: String },
    createdAt: { type: String },
});


