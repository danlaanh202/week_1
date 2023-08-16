import Koa from "koa";
import Router from "koa-router";
import routing from "./routes";
import KoaBody from "koa-body";

const app = new Koa();
app.use(KoaBody());
const router = new Router();
routing(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000);
