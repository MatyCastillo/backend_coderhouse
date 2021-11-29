import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import upload from "./services/upload.js";
import ProductsContainer from "./classes/ProductsContainer.js";
import productsRouter from "./routes/products.routes.js";

const app = express();
const server = app.listen(8080, () => {
  console.log("server listening on port 8080");
});
const contenedor = new ProductsContainer();

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", productsRouter);

app.get("/products", (req, res) => {
  contenedor.getAll().then((result) => {
    let info = result.products;
    let prepareObject = {
      products: info,
    };
    res.render("products", prepareObject);
  });
});
