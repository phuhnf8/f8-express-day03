function exceptionHandler(err, req, res, next) {
	console.error(err);
	return res.error(500, "Internal Server Error", err);
}

module.exports = exceptionHandler;
