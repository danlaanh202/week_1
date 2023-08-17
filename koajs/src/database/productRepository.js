import fs from "fs";
import path from "path";
import getSomeFields from "../helpers/utils/getSomeFields";
const { data: products } = require("./products.json");
const saveProducts = (data) => {
  fs.writeFileSync(
    path.join(__dirname, "/products.json"),
    JSON.stringify({
      data,
    })
  );
};

function getProducts(limit, sort) {
  const tempProducts = [...products];

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
  let arrayIndex;
  const foundProduct = tempProducts.find((product, index) => {
    if (product.id === parseInt(id)) {
      arrayIndex = index;
      return product;
    }
  });
  const updatedProduct = { ...foundProduct, ...data };
  tempProducts[arrayIndex] = updatedProduct;

  saveProducts(tempProducts);
  return updatedProduct;
}

function deleteProductById(id) {
  const tempProducts = [...products].filter((item) => item.id !== parseInt(id));
  saveProducts(tempProducts);
}

function getProductById(idx, fields) {
  // ex: http://localhost:5000/api/products/:id&fields=id&fields=name...
  const product = products.find((product) => product.id === idx);

  if (fields?.length > 0) {
    return getSomeFields(product, fields);
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
