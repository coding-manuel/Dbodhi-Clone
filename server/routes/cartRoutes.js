const express = require("express");
const router = express.Router();
const {
    getCart,
    changeCartItem,
    deleteCartItem,
} = require("../controller/cartController");

// router.get("/", getProducts);
// router.get("/:id", getProductById);

module.exports = router;