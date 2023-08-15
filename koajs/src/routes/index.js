export default (router) => {
  router.prefix("/api");
  router.use("/books", require("./bookRoutes"));
  router.use("/products", require("./productRoutes"));
};
