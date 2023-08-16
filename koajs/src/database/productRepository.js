import saveProducts from "../utils/saveProducts";
const { data: products } = require("./products.json");
/**
 *
 * @returns {[{name: string, price: number, id: number, description: string, product: string, color: string, createdAt: string, image: string}]}
 */
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

/**
 *
 * @param {id: number,name: string,price: number,description: string,product: string,color: string,createdAt: string,image: string}
 */

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

/**
 *
 * @param id
 */
function deleteProductById(id) {
  const tempProducts = [...products];
  tempProducts.filter((item) => item !== parseInt(id));
  saveProducts(tempProducts);
}
/**
 *
 * @param id
 * @returns {{id: number, name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} | {id: number, name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} }
 */
function getProductByField(field, fieldData) {
  //todo: ý anh là bảo vẫn get bằng id nhưng anh chỉ muốn lấy 1 vài fields ra ngoài chứ k lấy tất cả , ví dụ sau này có token mình sẽ không lấy token ra ngoài chawgr hạn
  return products.find((product) => product[field] === fieldData);
}

export {
  getProductByField,
  getProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
