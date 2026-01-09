const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
/**
 * Bring all header config together here.
 * @param {Express} app Express app instance
 */
function assignHeader(app) {
	app.use(express.json({}));
	app.use(express.urlencoded({ extended: true }));
	app.use(helmet());
	app.use(morgan("dev"));
}

module.exports = assignHeader;
