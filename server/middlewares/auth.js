const ServerError = require('../utils/serverError');
const config = require('../../common/config');
const logger = require('../utils/logger')(config.admin_server.logger.type);
const passport = require('passport');

require('./passport');

module.exports = function(app) {

	app.use(passport.initialize());
	app.use(passport.session());

	app.post('/sign-in', (req, res, next) => {
		passport.authenticate('local', (err, user) => {
			if (err) {
				return next(new ServerError(err));
			}

			logger.info('User %s was authorized', user.email);

			req.logIn(user, () => {
				req.session.save(() => {
					res.redirect('/main/agents-list');
				});
			});
		})(req, res, next);
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


	app.post('/sign-out', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};