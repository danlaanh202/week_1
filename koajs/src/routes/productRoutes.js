const Router = require("koa-router");
const router = new Router();
const productHandler = require("../handlers/products/productHandler");
const productInputMiddleware = require("../middleware/productInputMiddleware");

router.get("/", productHandler.getProducts);
router.get("/:id", productHandler.getProduct);
router.post("/", productInputMiddleware, productHandler.createProduct);
router.put("/:id", productHandler.updateProduct);
router.delete("/:id", productHandler.deleteProduct);

module.exports = router.routes();
