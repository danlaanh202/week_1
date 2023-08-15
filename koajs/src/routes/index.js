import bookRoutes from "./bookRoutes";
import productRoutes from "./productRoutes";
const routing = (router) => {
  router.prefix("/api");
  // router.use("/books", bookRoutes);
  router.use("/products", productRoutes);
};
export default routing;
