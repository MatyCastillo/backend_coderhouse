import MongoContainer from "../../containers/MongoContainer.js";
//import { products } from "../index.js";

export default class ProductsMongo extends MongoContainer {
  constructor() {
    super(
      "products",
      {
        nombre: { type: String, require: true },
        descripcion: { type: String, require: true },
        codigo: { type: String, require: true },
        foto: { type: String, require: true },
        stock: { type: Number, require: true },
      },
      { timestamps: true }
    );
  }
  save = async (product) => {
    try {
      let arr = (
        await this.collection.find({
          $or: [{ nombre: product.nombre }, { codigo: product.codigo }],
        })
      ).length;
      if (arr === 0) {
        let result = await this.collection.create(product);
        return {
          status: "success",
          message: "Objeto guardado",
          payload: result,
        };
      } else {
        return { status: "error", message: `Nombre o Código ya registrado` };
      }
    } catch (error) {
      return { status: "error", message: `error: ${error}` };
    }
  };
}
