var express = require('express');
var app = express();

app.all('/', (req, res) => {
	setTimeout(() => {
		res.send('Hello');
	}, 3000);
});

app.listen(8443);