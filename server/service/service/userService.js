const BaseService = require('../baseService');
const auth = require('passport-local-authenticate');
const async = require('async');
const validate = require('../../../common/validate');

class UserService extends BaseService {

	constructor() {
		super();

		this.table = 'user';
		this._authOptions = { digestAlgorithm: 'sha256' };
	}

	serializeUser(user, next) {
		if (next) {
			return next(null, user.id);
		}
		return user.id;
	}

	deserializeUser(id, next) {
		this.getBy({ id: id }, next);
	}

	register(email, password, next) {
		async.waterfall([
			next => this._validateEmail(email, (err, users) => {
				if (err) {
					return next(err);
				}

				if (users.length) {
					return next('User with such email already exists');
				}

				return next();
			}),
			next => this.create(email, password, next)
		], (err, user) => {
			if (err) {
				return next(typeof err === 'string' ? err : err.message);
			}
			return next(null, user);
		});
	}

	_validateEmail(email, next) {
		if (!validate.email(email)) {
			return next('Email is invalid');
		}

		this.getBy({ 'email': email }, (err, users) => {
			if (err) {
				return next('Error during email validation: %s', err);
			}

			next(null, users);
		});
	}

	_validatePassword(user, password, next) {
		auth.hash(password, function(err, hashed) {
			if (err) {
				return next(err);
			}

			auth.verify(password, { hash: user.password, salt: user.salt }, (err, verified) => {
				if (err) {
					return next(err);
				}

				if (!verified) {
					err = 'User password is not verified';
				}
				return next(err, verified ? user : null);
			});
		});
	}

	_authenticate(email, password, next) {
		async.waterfall([
			next => this._validateEmail(email, (err, users) => {
				if (err) {
					return next(err);
				}

				if (!users.length) {
					return next('There is no user with such email');
				}

				return next(null, users[0]);
			}),
			(user, next) => this._validatePassword(user, password, next)
		], (err, user) => {
			if (err) {
				return next(typeof err === 'string' ? err : err.message, false);
			}

			return next(null, user);
		});
	}

	authenticate(email, password, next) {
		if (!email || !password) {
			return next(null, false, 'Username and password are required');
		}

		this._authenticate(email, password, next);
	}

	create(email, password, next) {
		auth.hash(password, (err, hashed) => {
			if (err) {
				return next(err);
			}

			let user = {
				email: email,
				password: hashed.hash,
				salt: hashed.salt
			};

			super.create(user, (err, users) => {
				if (err) {
					return next(err);
				}

				return next(null, users[0]);
			});
		});
	}
}

module.exports = UserService;