const Koa = require("koa");
const Router = require("koa-router");
const routing = require("./routes");
// const koaBody = require("koa-body");

const app = new Koa();
const router = new Router();
routing(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000);
