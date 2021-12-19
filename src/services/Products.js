import database from "../config.js";

export default class Products {
  constructor() {
    database.schema.hasTable("ecommerce").then((result) => {
      if (!result) {
        database.schema
          .createTable("ecommerce", (table) => {
            table.increments();
            table.string("title").notNullable();
            table.integer("price").notNullable();
            table.string("thumbnail").defaultTo("no_photo");
          })
          .then((result) => {
            console.log("productos creados");
          });
      }
    });
  }
  getAll = async () => {
    try {
      let products = await database.select().table("ecommerce");
      return { status: "success", products: products };
    } catch (error) {
      return { status: "error", message: error };
    }
  };
  getById = async (id) => {
    try {
      let product = await database
        .select()
        .table("ecommerce")
        .where("id", id)
        .first();
      if (product) {
        return { status: "success", product: product };
      } else {
        return { status: "error", message: "Producto no encontrado" };
      }
    } catch (error) {
      return { status: "error", message: error };
    }
  };
  saveProduct = async (product) => {
    try {
      let exists = await database
        .table("ecommerce")
        .select()
        .where("title", product.title)
        .first();
      if (exists) return { status: "error", message: "El codigo ya existe" };
      let result = await database.table("ecommerce").insert(product);
      return {
        status: "success",
        message: `Producto registrado. id: ${result[0]}`,
      };
    } catch (error) {
      return {
        status: "error",
        message: `Error al guardar el producto ${error}`,
      };
    }
  };
  update = async (id, product) => {
    try {
      let result = await database
        .table("ecommerce")
        .update(product)
        .where("id", id);
      if (result) {
        return {
          status: "success",
          message: `Producto actualizado.`,
        };
      } else {
        return {
          status: "error",
          message: `Producto no encontrado`,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: `Error al actualizar el producto ${error}`,
      };
    }
  };
  deleteById = async (id) => {
    try {
      let result = await database.table("ecommerce").del().where("id", id);
      if (result) {
        return {
          status: "success",
          message: `Producto eliminado.`,
        };
      } else {
        return {
          status: "error",
          message: `Producto no encontrado`,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: `Error al eliminar el producto ${error}`,
      };
    }
  };
}
