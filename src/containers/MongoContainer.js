import mongoose from "mongoose";
import config from "../config.js";

mongoose.connect(config.mongo.baseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default class MongoContainer {
  constructor(collection, schema, timestamps) {
    this.collection = mongoose.model(
      collection,
      new mongoose.Schema(schema, timestamps)
    );
  }
  getAll = async () => {
    try {
      let documents = await this.collection.find();
      return { status: "success", payload: documents };
    } catch (error) {
      return { status: "error", message: `error ${error}` };
    }
  };
  getById = async (id) => {
    try {
      let arr = await (
        await this.collection.find({ nombre: "Zapatsdillas" })
      ).length;
      if (arr === 0) {
        console.log(arr, "no está");
      } else {
        console.log(arr, " está");
      }
    } catch (error) {
      return { status: "error", message: `error ${error}` };
    }
  };
}
