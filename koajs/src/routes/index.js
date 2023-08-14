const Router = require("koa-router");
const apiRouter = new Router({ prefix: "/api" });
const bookRouter = require("./bookRoutes");
const productRouter = require("./productRoutes");

function route() {
  apiRouter.use("/books", bookRouter);
  apiRouter.use("/products", productRouter);
}
module.exports = route;
