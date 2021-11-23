const express = require("express");
const router = express.Router();
const ProductsContainer = require("../classes/ProductsContainer");
const contenedor = new ProductsContainer();
const upload = require("../services/upload");

//GETS
router.get("/", (req, res) => {
  contenedor.getAll().then((result) => {
    res.send(result);
  });
});

router.get("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.getById(id).then((result) => {
    res.send(result);
  });
});
//POST
router.post("/", upload.single("image"), (req, res) => {
  let file = req.file;
  let product = req.body;
  product.price = parseInt(product.price);
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  contenedor.save(product).then((result) => {
    res.send(result);
  });
});
//PUT
router.put("/:pid", upload.single("image"), (req, res) => {
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
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.deleteById(id).then((result) => {
    res.send(result);
  });
});

module.exports = router;
