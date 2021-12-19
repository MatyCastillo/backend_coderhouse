import express from "express";
import ProductsContainer from "../classes/ProductsContainer.js";
import upload from "../services/upload.js";
import { io } from "../app.js";
import Products from "../services/Products.js";

const router = express.Router();
const contenedor = new ProductsContainer();
const productsServices = new Products();
//GETS
router.get("/", (req, res) => {
  productsServices.getAll().then((result) => {
    res.send(result);
  });
});

router.get("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  productsServices.getById(id).then((result) => {
    res.send(result);
  });
});
//POST
router.post("/", upload.single("foto"), (req, res) => {
  let file = req.file;
  let product = req.body;
  if (product.thumbnail)
    product.thumbnail =
      req.protocol +
      "://" +
      req.hostname +
      ":8080" +
      "/images/" +
      file.filename;
  /*   if (!product.title && !product.price)
    return res.send({ status: "error", menssage: "Datos incompletos" }); */
  productsServices.saveProduct(product).then((result) => {
    res.send(result);
    if (result.status === "success") {
      productsServices.getAll().then((result) => {
        io.emit("updateProducts", result);
      });
    }
  });
});
//PUT
router.put("/:pid", upload.single("image"), (req, res) => {
  let file = req.file;
  let product = req.body;
  let id = parseInt(req.params.pid);
  if (product.thumbnail !== undefined)
    product.thumbnail =
      req.protocol +
      "://" +
      req.hostname +
      ":8080" +
      "/images/" +
      file.filename;
  console.log(product.thumbnail);
  productsServices.update(id, product).then((result) => {
    res.send(result);
  });
});
//DELETE
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  productsServices.deleteById(id).then((result) => {
    res.send(result);
  });
});

export default router;
