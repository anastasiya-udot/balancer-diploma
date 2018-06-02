module.exports = {
	db: {
		logger: {
			type: 0,
			path: 'server/var/data/db.log'
		},
		path: 'server/var/data/db.sqlite',
		migrations: 'server/var/data/migrations.json'
	},
	admin_server: {
		name: 'Admin server',
		port: '3000',
		logger: {
			type: 1,
			path: 'server/var/data/admin.log'
		}
	},
	proxy_server: {
		name: 'Proxy server',
		port: '8080',
		logger: {
			type: 2,
			path: 'server/var/data/proxy.log'
		}
	},
	agents_server: {
		name: 'Agents server',
		port: '8443',
		logger: {
			type: 3,
			path: 'server/var/data/agent.log'
		}
	}
};