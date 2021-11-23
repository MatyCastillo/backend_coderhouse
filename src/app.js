const express = require("express");
const cors = require("cors");
const upload = require("./services/upload");
const ProductsContainer = require("./classes/ProductsContainer");
const app = express();
const server = app.listen(8080, () => {
  console.log("server listening on port 8080");
});
const contenedor = new ProductsContainer();
const productsRouter = require("./routes/products.routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", productsRouter);
