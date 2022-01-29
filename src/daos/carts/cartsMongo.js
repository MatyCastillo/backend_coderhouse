import Schema from "mongoose";
import MongoContainer from "../../containers/MongoContainer.js";

export default class CartsMongo extends MongoContainer {
  constructor() {
    super(
      "cart",
      {
        productos: {
          type: [{ type: Schema.Types.ObjectId, ref: "products" }],
          default: [],
        },
      },
      { timestamp: true }
    );
  }
  save = async () => {
    try {
      let result = await this.collection.create({});
      return { status: "success", message: `Carrito creado`, payload: result };
    } catch (error) {
      return { status: "error", message: `error: ${error}` };
    }
  };
  addProducts = async (cartId, productsID) => {
    try {
      let result = await this.collection.updateOne(
        { _id: cartId },
        { $push: { productos: productsID } }
      );
      return {
        status: "success",
        message: `Productos añadidos al carrito`,
        payload: result,
      };
    } catch (error) {
      return { status: "error", message: `error: ${error}` };
    }
  };
}
