const Router = require("koa-router");
const bookHandler = require("../handlers/books/bookHandlers");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");

const router = new Router();
// Routes will go here
router.get("/", bookHandler.getBooks);
router.get("/:id", bookHandler.getBook);
router.post("/", bookInputMiddleware, bookHandler.save);
module.exports = router;
