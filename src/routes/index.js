const handleError = require("@/config/handleError/index");
const {
	default: createRateLimiter,
	apiRateLimiter
} = require("@/middlewares/rateLimiter");
const responseFormat = require("@/middlewares/responseFormat");
const restAPIRouter = require("@/routes/restAPIRouter");

/**
 * Main entry for routing setup.
 * @param {Express} app Express application instance.
 */
function handleRoutes(app) {
	// Restful API
	app.use(responseFormat);

	app.use("/api", createRateLimiter(apiRateLimiter), restAPIRouter);

	// Default gateway route
	app.get("/", (req, res) => {
		res.success({ message: "Welcome to the API" });
	});

	// Testing
	app.get("/test-success", (req, res) => {
		res.success({ message: "Hello World" });
	});

	app.get("/test-error", (req, res) => {
		throw new Error("Test exception");
	});

	// Error handling
	handleError(app);
}

module.exports = handleRoutes;
