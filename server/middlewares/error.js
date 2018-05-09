const logger = require('../utils/logger')();
const ServerError = require('../utils/serverError');

module.exports = function(app) {
	app.use((req, res, next) => {
		next(new ServerError(404));
	});

	app.use((err, req, res, next) => {
		logger.error(err.message, err.stack);
		res.status(err.httpCode || 500).send({ message: err.message });
	});
};