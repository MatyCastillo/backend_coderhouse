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
}
