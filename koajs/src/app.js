const Koa = require("koa");
const Router = require("koa-router");
const route = require("./routes");
// const koaBody = require("koa-body");

const app = new Koa();
route();
app.listen(5000);
