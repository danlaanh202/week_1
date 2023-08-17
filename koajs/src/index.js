import Koa from "koa";
import Router from "koa-router";
import routes from "./routes";
import KoaBody from "koa-body";

const app = new Koa();
app.use(KoaBody());
const router = new Router();
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
