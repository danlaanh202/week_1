import fs from "fs";
import * as products from "./products.json";
/**
 *
 * @returns {[{name: string, price: number, id: number, description: string, product: string, color: string, createdAt: string, image: string}]}
 */
function getProducts(limit, sort) {
  if (sort) {
    products =
      sort === "asc"
        ? products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        : products.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
  }
  if (limit) {
    products = products.slice(0, limit);
  }
  return products;
}

/**
 *
 * @param {id: number,name: string,price: number,description: string,product: string,color: string,createdAt: string,image: string}
 */

function createNewProduct(data) {
  const updatedProducts = [data, ...products];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}

function updateProductById(id, data) {
  let arrayIndex;
  const foundProduct = products.find((product, index) => {
    if (product.id === parseInt(id)) {
      arrayIndex = index;
      return product;
    }
  });
  const updatedProduct = { ...foundProduct, ...data };
  products[arrayIndex] = updatedProduct;
  fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: products,
    })
  );
  return updatedProduct;
}

/**
 *
 * @param id
 */
function deleteProductById(id) {
  products.splice(products.map((item) => item.id).indexOf(id), 1);
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: products,
    })
  );
}
/**
 *
 * @param id
 * @returns {{id: number, name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} | {id: number, name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} }
 */
function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}

export {
  getProductById,
  getProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
