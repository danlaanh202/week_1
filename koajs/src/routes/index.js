import Router from "koa-router";
import bookRoutes from "./bookRoutes";
import productRoutes from "./productRoutes";

const router = new Router({
  prefix: "/api",
});
// router.use("/books", bookRoutes);
router.use("/products", productRoutes);

export default router;
