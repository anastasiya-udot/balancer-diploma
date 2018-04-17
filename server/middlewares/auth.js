let passport = require('passport');

require('./passport');

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	//app.post('sign-in', )

	app.post('/sign-up', (req, res, next) => {
		global.serviceLocator.get('userService').register(req.body.email, req.body.password, (err, user) => {
			if (err) {
				res.status(err.status || 500).send({ message: err.message });
				return;
			}

			req.login(user, (err) => {
				if (err) {
					res.status(err.status || 500).send({ message: err.message });
					return;
				}

				res.redirect('/');
			});
		});
	});
};