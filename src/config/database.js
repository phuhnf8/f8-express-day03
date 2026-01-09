const mysql = require("mysql2/promise");
const dbInterface = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "todo_dev",
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
});

module.exports = dbInterface;
