const dbInterface = require("@/config/database");

class Task {
	constructor() {
		this.db = dbInterface;
	}

	async getAllTasks() {
		const [rows] = await this.db.query("SELECT * FROM tasks");
		return rows;
	}

	async getTaskById(id) {
		if (typeof id !== "number") {
			throw new Error("Invalid ID");
		}

		const [rows] = await this.db.execute(
			"SELECT * FROM tasks WHERE id = ? LIMIT 1",
			[id]
		);

		return rows[0];
	}

	async createTask(taskData) {
		const { title, completed } = taskData;
		let mappedCompleted = 0;
		if ([1, "1", "completed"].includes(completed)) mappedCompleted = 1;

		const [result] = await this.db.execute(
			"INSERT INTO tasks (title, completed) VALUES (?, ?)",
			[title, mappedCompleted]
		);
		return { id: result.insertId, title, completed };
	}

	async updateTask(id, taskData) {
		const { title, completed } = taskData ?? {};
		let mappedCompleted = 0;
		if ([1, "1", "completed"].includes(completed)) mappedCompleted = 1;

		if (title && completed) {
			const [updateResult] = await this.db.execute(
				"UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
				[title, mappedCompleted, id]
			);
			return updateResult.affectedRows;
		} else if (title) {
			const [updateResult] = await this.db.execute(
				"UPDATE tasks SET title = ? WHERE id = ?",
				[title, id]
			);
			return updateResult.affectedRows;
		} else if (completed !== undefined) {
			const [updateResult] = await this.db.execute(
				"UPDATE tasks SET completed = ? WHERE id = ?",
				[mappedCompleted, id]
			);
			return updateResult.affectedRows;
		}
		return 0;
	}

	async deleteTask(id) {
		let idList = id.split(",").filter((item) => item > 0);
		if (idList.length === 0) return 0;
		idList = `(${idList.join(",")})`;
		const [deleteResult] = await this.db.execute(
			"DELETE FROM `tasks` WHERE `id` IN " + idList
		);
		return deleteResult.affectedRows;
	}
}
module.exports = new Task();
