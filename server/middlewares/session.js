const session = require('express-session');
const crypto = require('crypto');
const MemoryStore = require('memorystore')(session);

module.exports = function(app) {
	app.use(session({
		secret: crypto.randomBytes(20).toString(),
		saveUninitialized: false,
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true
		},
		store: new MemoryStore({
			checkPeriod: 24 * 60 * 60 * 100
		}),
		resave: false
	}));
};