import Koa from "koa";
import Router from "koa-router";
import routing from "./routes";

const app = new Koa();
const router = new Router();
routing(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000);
