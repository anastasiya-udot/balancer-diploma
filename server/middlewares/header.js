const conn = require('../../common/constants').CONNECTION;

module.exports = function(app) {
	app.use((req, res, next) => {

		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', `${conn.PROTOCOL}://localhost:${conn.PORT}`);

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Pass to next layer of middleware
		next();
	});
};