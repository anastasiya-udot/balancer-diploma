module.exports = {
	db: {
		path: 'server/var/data/db.sqlite',
		migrations: 'server/var/data/migrations.json'
	},
	log: {
		master: {
			type: 0,
			path: 'server/var/data/common.log'
		},
		proxy: {
			type: 1,
			path: 'server/var/data/proxy.log'
		}
	},
	proxy: {
		port: '8080'
	},
	agents_server: {
		port: '8443'
	}
};