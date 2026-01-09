const exceptionHandler = require("@/middlewares/exceptionHandler");
const notFoundHandler = require("@/middlewares/notFoundHandler");

function handleError(app) {
	app.use(notFoundHandler);
	app.use(exceptionHandler);
}

module.exports = handleError;
