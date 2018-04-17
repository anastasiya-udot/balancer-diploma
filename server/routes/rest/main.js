let router = require('../router')('all');

router.get('/all', (req, res, next) => {
	res.send('LALALA');
});

module.exports = router;