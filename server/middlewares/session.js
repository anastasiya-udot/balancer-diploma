const session = require('express-session');
const crypto = require('crypto');
const MemoryStore = require('memorystore')(session);

module.exports = function(app) {
	let httpSession = session({
		secret: crypto.randomBytes(20).toString(),
		store: new MemoryStore({
			checkPeriod: 24 * 60 * 60 * 1000
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true
		}
	});

	let httpsSession = session({
		secret: crypto.randomBytes(20).toString(),
		store: new MemoryStore({
			checkPeriod: 24 * 60 * 60 * 1000
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: true
		}
	});

	app.use(function sessionMiddleware(req, res, next) {
		if (req.protocol === 'https') {
			return httpsSession(req, res, next);
		} else {
			return httpSession(req, res, next);
		}
	});
};