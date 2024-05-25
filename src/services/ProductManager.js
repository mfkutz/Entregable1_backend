// const fs = require("fs");
import fs from "fs";

class Product {
  constructor(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnail = thumbnail;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;

    if (fs.existsSync(this.path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf8"));
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.status ||
      !product.stock ||
      !product.category
    ) {
      return "All fields are required";
    }

    if (this.products.some((p) => p.code === product.code)) {
      return `Code product "${product.code}" already exist`;
    }

    if (this.products.length > 0) {
      const lastProduct = this.products[this.products.length - 1];
      product.id = lastProduct.id + 1;
    } else {
      product.id = 1;
    }

    this.products.push(product);

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      return `Article "${product.title}" added successfully`;
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    if (isNaN(Number(id))) {
      return "ID must be a number";
    }

    const findProduct = this.products.find(
      (product) => product.id === Number(id)
    );
    if (!findProduct) {
      return "Product not found";
    }
    return findProduct;
  }

  async deleteProduct(id) {
    if (isNaN(Number(id))) {
      return "ID must be a number";
    }

    const productIndex = this.products.findIndex(
      (product) => product.id === Number(id)
    );
    if (productIndex === -1) {
      return `Product "${id}" not found`;
    }
    this.products.splice(productIndex, 1);

    try {
      fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
      return "Product deleted successfully";
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, product) {
    if (product.id) return "Can't update Id field, please remove it";
    if (isNaN(Number(id))) {
      return "ID must be a number";
    }

    const productIndex = this.products.findIndex(
      (product) => product.id === Number(id)
    );

    if (productIndex === -1) {
      return `Product "${id}" not found`;
    }

    const productOld = this.products[productIndex];

    this.products[productIndex] = {
      ...productOld,
      ...product,
    };

    try {
      fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
      return "Product updated successfully";
    } catch (error) {
      return error;
    }
  }
}

//For server use
export default new ProductManager("./src/data/products.json");
