const fs = require('fs');
const path = require('path');
const config = require('../../common/config');
const logger = require('../utils/logger')(config.admin_server.logger.type);
const _ = require('lodash');

const SERVICES_PATH = path.join(global.rootPath, 'server/service/service');

class ServiceLocator {

	init(next) {
		const services = fs.readdirSync(SERVICES_PATH);
		let promises = [];

		this.services = {};

		services.forEach(service => {
			const servicePath = path.join(SERVICES_PATH, service);
			const Service = require(servicePath);
			const serviceName = path.basename(service, '.js');

			promises.push(new Service(serviceName));
		});

		Promise.all(promises).then(services => {
			_.each(services, (service) => {
				this.services[service.name] = service;
				logger.info('Service %s was initialized', service.name);
			});

			_.each(this.services, (service, key) => {
				service.initialize();
			});

			next();
		}, (err) => {
			logger.console.error(`Failed to init serviceLocator: ${err}`);
			next(err);
		});
	}

	get(name) {
		let service = this.services[name];

		if (!service) {
			throw Error(`No sush service: ${name}`);
		}

		return service;
	}
}

module.exports = ServiceLocator;