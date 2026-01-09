const service = require("@/models/task.model");

class TaskController {
	constructor() {}

	async findAll(req, res, next) {
		try {
			const tasks = await service.getAllTasks();
			return res.success({ tasks });
		} catch (error) {
			return next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.error(422, "Task ID is required");
			}

			const task = await service.getTaskById(Number.parseInt(id));
			if (!task) return res.success({ task: null });

			return res.success({ task });
		} catch (error) {}
	}

	async createOne(req, res, next) {
		try {
			const payload = req.body;
			if (!payload || !payload.title) {
				return res.error(422, "Task title is required");
			}
			const newTask = await service.createTask(payload);
			return res.success({ task: newTask }, 201);
		} catch (error) {
			return next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const payload = req.body;
			if (!id) return res.error(422, "Task ID is required");

			const updatedTask = await service.updateTask(
				Number.parseInt(id),
				payload
			);

			return res.success({ affectedRows: updatedTask ?? 0 });
		} catch (error) {
			return next(error);
		}
	}

	async destroy(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.error(422, "Task ID is required");
			}
			// Placeholder for delete logic
			const deletedTask = await service.deleteTask(id);
			return res.success({ affectedRows: deletedTask ?? 0 });
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new TaskController();
