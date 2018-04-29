let passport = require('passport');
const ServerError = require('../utils/serverError');
const logger = require('../utils/logger')();

require('./passport');

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	app.post('/sign-in', (req, res, next) => {
		global.serviceLocator.get('userService').authenticate(req.body.email, req.body.password, (err, user) => {
			if (err) {
				return next(new ServerError(err));
			}

			logger.info('User %s was authorized', user.email);

			req.login(user, (err) => {
				if (err) {
					return next(new ServerError(err));
				}

				return res.send({ id: global.serviceLocator.get('userService').serializeUser(user) });
			});
		});
	});

	app.post('/sign-up', (req, res, next) => {
		global.serviceLocator.get('userService').register(req.body.email, req.body.password, (err, user) => {
			if (err) {
				return next(new ServerError(err));
			}

			logger.info('User %s was created', user.email);

			req.login(user, (err) => {
				if (err) {
					return next(new ServerError(err));
				}

				return res.send({ id: global.serviceLocator.get('userService').serializeUser(user) });
			});
		});
	});
};