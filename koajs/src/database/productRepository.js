const fs = require("fs");
const { data: products } = require("./products.json");
/**
 *
 * @returns {[{name: string, price: number, id: number, description: string, product: string, color: string, createdAt: string, image: string}]}
 */
function getAllProducts() {
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
/**
 *
 * @param id
 */
function updateProductById(id, data) {
  const updatedProduct = { ...getProductById(id), ...data };
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

function getProductsWithFilter(limit, sort = "asc") {
  if (sort === "asc") {
    return products
      .sort((a, b) => a.id - b.id)
      .slice(0, limit || products.length);
  } else if (sort === "desc") {
    return products
      .sort((a, b) => b.id - a.id)
      .slice(0, limit || products.length);
  } else {
    return products.slice(0, limit || products.length);
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
  getProductsWithFilter,
};
