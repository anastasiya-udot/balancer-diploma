const fs = require('fs');
const path = require('path');
const config = require('../../common/config');
const logger = require('../utils/logger')(config.admin_server.logger.type);

const SERVICES_PATH = path.join(global.rootPath, 'server/service/service');

class ServiceLocator {
	constructor() {
		const services = fs.readdirSync(SERVICES_PATH);

		this.services = {};

		services.forEach(service => {
			const servicePath = path.join(SERVICES_PATH, service);
			const Service = require(servicePath);
			const serviceName = path.basename(service, '.js');

			this.services[serviceName] = new Service();
			logger.info('Service %s was initialized', serviceName);
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

module.exports = new ServiceLocator();