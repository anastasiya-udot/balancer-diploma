const BaseService = require('../baseService');
const auth = require('passport-local-authenticate');
const async = require('async');
const validate = require('../../../common/validate');
const logger = require('../../utils/logger')();

class UserService extends BaseService {

	constructor() {
		super();

		this.table = 'user';
		this._authOptions = { digestAlgorithm: 'sha256' };
	}

	serializeUser(user, next) {
		next(null, user.id);
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
				logger.error('Failed to register user: %s', err);
				return next(typeof err === 'string' ? new Error(err) : err);
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
		auth.verify(password, user.password, this._authOptions, (err, verified) => {
			if (err) {
				return next(err);
			}

			if (!verified) {
				err = new Error('User password is not verified');
				logger.error(err.message);
			}
			return next(err, verified ? user : null);
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
				logger.error('Failed to authenticate user: %s', err);
				return next(null, false, { message: typeof err === 'string' ? err : err.toSting() });
			}

			return next(null, user);
		});
	}

	authenticate(email, password, next) {
		if (!email || !password) {
			return next(null, false, {
				message: 'Username and password are required'
			});
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
				password: hashed.hash
			};

			super.create(user, (err, users) => {
				if (err) {
					return next(err);
				}

				logger.info('User %s was created', users[0].email);

				return next(null, users[0]);
			});
		});
	}
}

module.exports = UserService;