const { rateLimit } = require("express-rate-limit");

// Implementation of rate limiter middleware
function createRateLimiter(options) {
	const { windowMs, maxRequests, message } = options;
	const limiter = rateLimit({
		windowMs,
		max: maxRequests,
		handler: (req, res, next, options) => {
			return res.error(429, options.message);
		}
	});
	return limiter;
}

const apiRateLimiter = {
	windowMs: 60000,
	maxRequests: 100,
	message: "Too many requests"
};

module.exports = { default: createRateLimiter, apiRateLimiter };
