const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    new: Boolean,
    category: String,
    description: Array,
    details: String,
    delivery: String,
    sizes: Array,
    images: Array
})

const product = mongoose.model("product", productSchema)

module.exports = product