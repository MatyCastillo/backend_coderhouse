let products;
let carts;

const { default: ProductsMongo } = await import("./products/productsMongo.js");
const { default: CartsMongo } = await import("./carts/cartsMongo.js");
products = new ProductsMongo();
carts = new CartsMongo();

export { products, carts };
