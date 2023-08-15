import Router from "koa-router";
import bookHandler from "../handlers/books/bookHandlers";
import bookInputMiddleware from "../middleware/bookInputMiddleware";

const router = new Router();
// Routes will go here
router.get("/", bookHandler.getBooks);
router.get("/:id", bookHandler.getBook);
router.post("/", bookInputMiddleware, bookHandler.save);
export default router;
