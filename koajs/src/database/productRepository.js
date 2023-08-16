import saveProducts from "../utils/saveProducts";
const { data: products } = require("./products.json");

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
  const updatedProducts = [data, ...products];
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
  const tempProducts = [...products];
  tempProducts.filter((item) => item !== parseInt(id));
  saveProducts(tempProducts);
}

function getProductById(idx) {
  //todo : viết thành 1 hàm tổng quát cho anh nhé , để sau còn dùng đc vào nhiều chỗ khác nhau
  const { id, name, description, price, product, color, createdAt, image } =
    products.find((product) => product.id === idx);
  return { id, name, description, price, product };
}

export {
  getProductById,
  getProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
