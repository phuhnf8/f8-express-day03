const taskRouter = require("@/routes/taskRouter");

const restAPIRouter = require("express").Router();

restAPIRouter.use("/tasks", taskRouter);

restAPIRouter.get("/", (req, res, next) => {
	return res.success({ message: "API is working" });
});

module.exports = restAPIRouter;
