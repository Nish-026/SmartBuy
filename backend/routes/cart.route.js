const express = require("express");
const { connection } = require("../db")
const { authenticate } = require("../middleware/authenticate.middleware")
const cartRouter = express.Router()
const { cartModel } = require("../model/cart.model")
const { productModel } = require("../model/products.model")


//-------------------------------------- For getting the cart by userID --------------------------------------------------//
cartRouter.get("/", authenticate, async (req, res) => {
  await connection
  const { userID } = req.body;
  const cart = await cartModel.find({ userID })
  const products = []
  // console.log(cart)
  if (cart.length > 0) {
    for (let i = 0; i < cart[0].items.length; i++) {
      const product = await productModel.findOne({ _id: cart[0].items[i]["product_id"] })
      // console.log(product);
      products.push(product);
    }
    res.send({ products, cart });
  } else {
    res.send({ msg: "empty" })
  }

})




//--------------------------------------------------- For adding products into Cart ----------------------------------------//

cartRouter.post('/add', authenticate, async (req, res) => {
  try {
    const { userID, product_id, quantity, price } = req.body; // Assuming you're sending these values in the request body
    // Find the cart for the given userID
    let cart = await cartModel.findOne({ userID });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new cartModel({
        userID,
        items: [],
        total_price: 0
      });
    }
    // console.log(cart.items);
    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.product_id == product_id);

    if (existingItem) {
      // If the product already exists, update the quantity and price
      existingItem.quantity += quantity;
      existingItem.price += price;
    } else {
      // If the product doesn't exist, add a new item to the cart
      cart.items.push({
        product_id,
        quantity,
        price
      });
    }

    // Update the total price of the cart
    cart.total_price += price;

    // Save the cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// --------------------------------- DELETE route for removing a product from the cart   ----------------------------------------//

cartRouter.delete('/delete/:productId',authenticate, async(req, res) => {
  const { productId } = req.params;

  try {
    // Find the cart based on the user's ID
    const cart = await cartModel.findOne({ userID: req.body.userID });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product_id === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }
    console.log(productIndex)
    // Remove the product from the items array

    const removedProductPrice = cart.items[productIndex].price*(cart.items[productIndex].quantity);
    cart.total_price -= removedProductPrice;
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    // Return a success response
    return res.json({ message: 'Product removed from the cart' });
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
});

//-----------------------------------------------Route for decreasing the quantity -------------------------------------------------//
cartRouter.put('/decrement/:productId', authenticate,async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the cart based on the user's ID
    const cart = await cartModel.findOne({ userID: req.body.userID });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = cart.items.find((item) => item.product_id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    if (product.quantity > 1) {
      // Decrement the quantity by 1
      product.quantity -= 1;

      // Update the total price by subtracting the product price
      cart.total_price -= product.price;

      // Save the updated cart
      await cart.save();
    }

    // Return a success response
    return res.json({ message: 'Product quantity decremented' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//-------------------------------------------- Route for incrementing the quantity of a product ---------------------------------//
cartRouter.put('/increment/:productId', authenticate,async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the cart based on the user's ID
    const cart = await cartModel.findOne({ userID: req.body.userID });
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = cart.items.find((item) => item.product_id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Increment the quantity by 1
    product.quantity += 1;

    // Update the total price by adding the product price
    cart.total_price += product.price;

    // Save the updated cart
    await cart.save();

    // Return a success response
    return res.json({ message: 'Product quantity incremented' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  cartRouter
}