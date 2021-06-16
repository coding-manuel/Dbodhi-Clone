const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    product: {
        title: String,
        price: String,
        new: Boolean,
        category: String,
        description: Array,
        details: String,
        delivery: String,
        sizes: Array,
        images: Array
    },
    quantity: Number,
    size: String
})

const cart = mongoose.model("cart", cartSchema)

module.exports = cart