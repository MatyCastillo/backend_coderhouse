let products;
let carts;
let persistence = "mongo";

switch (persistence) {
  case "mongo":
    const { default: ProductsMongo } = await import(
      "./products/productsMongo.js"
    );
    const { default: CartsMongo } = await import("./carts/cartsMongo.js");
    products = new ProductsMongo();
    carts = new CartsMongo();
    break;
}
export { products, carts };
