import Router from "koa-router";
import productHandler from "../handlers/products/productHandler";
import productInputMiddleware from "../middleware/productInputMiddleware";

const router = new Router();

router.get("/", productHandler.getProducts);
router.get("/:id", productHandler.getProduct);
router.post("/", productInputMiddleware, productHandler.createProduct);
router.put("/:id", productHandler.updateProduct);
router.delete("/:id", productHandler.deleteProduct);

export default router.routes();
