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
      let response = await this.collection.find({ _id: id });
      return { status: "success", payload: response };
    } catch (error) {
      return { status: "error", message: `Objeto no encontrado` };
    }
  };
  deleteById = async (id) => {
    try {
      let response = await this.collection.deleteOne({ _id: id });
      return { status: "success", payload: response };
    } catch (error) {
      return { status: "error", message: `Objeto no encontrado` };
    }
  };
}
