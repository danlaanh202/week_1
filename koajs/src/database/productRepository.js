import fs from "fs";
import path from "path";
import pickFields from "../helpers/utils/pickFields";
const { data: products } = require("./products.json");
const saveProducts = (data) => {
  fs.writeFileSync(
    path.join(__dirname, "/products.json"),
    JSON.stringify({
      data,
    })
  );
};

function getProducts(params = {}) {
  const { sort, limit } = params;

  let tempProducts = [...products];

  if (sort) {
    tempProducts =
      sort === "asc"
        ? tempProducts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        : tempProducts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
  }
  if (limit) {
    tempProducts = tempProducts.slice(0, limit);
  }
  return tempProducts;
}

function createNewProduct(data) {
  const updatedProducts = [...products, data];
  saveProducts(updatedProducts);
}

function updateProductById(id, data) {
  const tempProducts = [...products];

  const productIndex = tempProducts.findIndex(
    (elem) => elem.id === parseInt(id)
  );
  const updatedProduct = { ...tempProducts[productIndex], ...data };
  tempProducts[productIndex] = updatedProduct;
  saveProducts(tempProducts);
  return updatedProduct;
}

function deleteProductById(id) {
  const tempProducts = [...products].filter((item) => item.id !== parseInt(id));
  saveProducts(tempProducts);
}

function getProductById(idx, fields) {
  const product = products.find((product) => product.id === idx);

  if (fields?.length > 0) {
    return pickFields(product, fields);
  }
  return product;
}

export {
  getProductById,
  getProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
