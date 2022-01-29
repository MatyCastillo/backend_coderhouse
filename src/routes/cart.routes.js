import express from "express";
import CartContainer from "../containers/CartContainer.js";
import { carts } from "../daos/index.js";
const router = express.Router();
const cartContainer = new CartContainer();
//POST
router.post("/", (req, res) => {
  carts.save().then((result) => {
    res.send(result);
  });
});
router.post("/:cartid/productos", (req, res) => {
  let cartID = req.params.cartid;
  let productsID = req.body.ids;
  carts.addProducts(cartID, productsID).then((result) => {
    res.send(result);
  });
});
//GETS
router.get("/:id/productos", (req, res) => {
  let id = parseInt(req.params.id);
  cartContainer.getProductsInCartById(id).then((result) => {
    res.send(result.products);
  });
});
router.get("/", (req, res) => {
  cartContainer.getAll().then((result) => {
    res.send(result);
  });
});
//DELETE
router.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  cartContainer.deleteById(id).then((result) => {
    res.send(result);
  });
});
router.delete("/:id/productos/:id_prod", (req, res) => {
  let cartId = parseInt(req.params.id);
  let productId = parseInt(req.params.id_prod);
  cartContainer.deleteProductById(cartId, productId).then((result) => {
    res.send(result);
  });
});

export default router;
