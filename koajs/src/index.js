import Koa from "koa";
import Router from "koa-router";
import routing from "./routes";


//todo : tham khảo cái này rồi xử dụng nhé https://www.npmjs.com/package/koa-body
const app = new Koa();
const router = new Router();
routing(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000);
