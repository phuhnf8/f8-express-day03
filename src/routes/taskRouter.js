const taskRouter = require("express").Router();
const controller = require("@/controllers/taskController");
taskRouter.get("/:id", controller.findOne);
taskRouter.put("/:id", controller.update);
taskRouter.delete("/:id", controller.destroy);

taskRouter.get("/", controller.findAll);
taskRouter.post("/", controller.createOne);

module.exports = taskRouter;
