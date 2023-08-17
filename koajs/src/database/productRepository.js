import fs from "fs";
import path from "path";
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
  // ex: http://localhost:5000/api/todoes/:id&fields=id,name,...
  const product = products.find((product) => product.id === idx);
  //todo: fields chỗ này em truyền string à fields nên truyền bằng array á để dùng cho nhiều chỗ với cả nên check xem là obj có field đấy không nữa nhé + tách ra thành 1 functions bỏ ở helpers ấy , sửa nốt chỗ này nha
  if (fields) {
    const fieldsObj = fields.split(",").reduce((prev, key) => {
      prev[key] = product[key];
      return prev;
    }, {});
    return fieldsObj;
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
