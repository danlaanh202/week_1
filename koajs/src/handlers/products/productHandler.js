//todo: tìm  cách dùng import em nhé 
const {
  getProductById,
  getAllProducts,
  createNewProduct,
  updateProductById,
  deleteProductById,
  getProductsWithFilter,
} = require("../../database/productRepository");
/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const { limit, sort } = ctx.request.query;
    //todo: mình tách 2 điều kiện này ra riêng nhé đôi khi viết thế này không phải th nào cũng ổn đâu .
    if (limit || sort) {
      const products = getProductsWithFilter(limit, sort);
      ctx.status = 200;
      return (ctx.body = {
        data: products,
      });
    }
    //todo : sao mình là phải tách riêng thế này khi có và không có filter nhỉ ? gộp lại chung đc không ? 
    const products = getAllProducts();
    ctx.status = 200;
    return (ctx.body = {
      data: products,
    });
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = getProductById(id);
    if (product) {
      return (ctx.body = {
        data: product,
      });
    }
    ctx.status = 404;
    return (ctx.body = {
      status: "error!",
      message: "Product not found!",
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

async function createProduct(ctx) {
  try {
    const data = ctx.request.body;
    createNewProduct({ ...data, createdAt: new Date().toISOString() });
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateProduct(ctx) {
  try {
    const { id } = ctx.params;
    const updatedProduct = updateProductById(id, ctx.request.body);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    console.log(id);
    deleteProductById(id);
    ctx.status = 204;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
