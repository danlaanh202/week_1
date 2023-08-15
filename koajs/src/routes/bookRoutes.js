const Router = require("koa-router");
const bookHandler = require("../handlers/books/bookHandlers");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");

//todo : đổi lại format thành như thế này nhé ? https://imgur.com/eCVi6Mv

const router = new Router();
// Routes will go here
router.get("/", bookHandler.getBooks);
router.get("/:id", bookHandler.getBook);
router.post("/", bookInputMiddleware, bookHandler.save);
module.exports = router.routes();
