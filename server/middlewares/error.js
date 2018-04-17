const logger = require('../utils/logger')();

module.exports = function(app) {
	app.use((req, res, next) => {
		const err = new Error('Not Found');

		err.status = 404;
		next(err);
	});

	app.use((err, req, res) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		logger.error(err);

		res.status(err.status || 500).send({ message: err.message });
		res.render('error');
	});
};