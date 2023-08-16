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
  const { id, name, description, price, product, color, createdAt, image } =
    products.find((product) => product.id === idx);
  // Cái này tuỳ theo mục đích sử dụng nên em không biết nên return gì nên em sẽ get vài field trong product
  return { id, name, description, price, product };
  // giả sử sau này có data như user = {username, password, token, dob, gender} thì có thể loại trừ các field password và token như sau:
  // const {password, token, ...result} = user
  // return result;
}

export {
  getProductById,
  getProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
