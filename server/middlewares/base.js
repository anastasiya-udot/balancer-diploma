const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const openInEditor = require('launch-editor-middleware');

module.exports = function(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use('/__open-in-editor', openInEditor());
};