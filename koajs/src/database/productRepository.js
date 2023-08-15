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

function getProductsWithFilter(limit, sort = "asc") {
  //todo : tìm cách giảm bớt else if tại có thể  bỏ sót các th , tìm cách dùng mình if thôi chẳng hạn
  // thêm nữa là anh thấy sort với slice đang dùng đi dùng lại mà lại 1 cùng 1 mục đúc có thể nào tách ra cho đỡ if else và dùng sort hoặc slice 1 đến 2 lần không ? 
  if (sort === "asc") {
    return products
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, limit || products.length);
  } else if (sort === "desc") {
    return products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
