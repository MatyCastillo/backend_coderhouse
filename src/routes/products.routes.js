import express from "express";
import ProductsContainer from "../containers/ProductsContainer.js";
import upload from "../services/upload.js";
import { io } from "../app.js";
import { authMiddleware } from "../utils.js";
import { products } from "../daos/index.js";
const router = express.Router();
const contenedor = new ProductsContainer();
//GETS
router.get("/", (req, res) => {
  products.getAll().then((result) => {
    res.send(result);
  });
});

router.get("/:pid", (req, res) => {
  let id = req.params.pid;
  products.getById(id).then((result) => {
    res.send(result);
  });
});
//POST
router.post("/", upload.single("foto"), authMiddleware, (req, res) => {
  // let file = req.file;
  let product = req.body;
  // product.precio = parseInt(product.precio);
  // product.timestamp = Date.now();
  // product.stock = parseInt(product.stock);
  // product.codigo = parseInt(product.codigo);
  // product.foto =
  //   req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  products.save(product).then((result) => {
    res.send(result);
    // if (result.status === "success") {
    //   contenedor.getAll().then((result) => {
    //     io.emit("updateProducts", result);
    //   });
    // }
  });
});
//PUT
router.put("/:pid", upload.single("image"), authMiddleware, (req, res) => {
  let file = req.file;
  let product = req.body;
  let id = parseInt(req.params.pid);
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  contenedor.update(id, product).then((result) => {
    res.send(result);
  });
});
//DELETE
router.delete("/:pid", authMiddleware, (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.deleteById(id).then((result) => {
    res.send(result);
  });
});

export default router;
