const EventCollection = require('./eventCollection');
const CpuInfoItem = require('../models/cpuInfoItem');

class CpuInfoCollecion extends EventCollection {
	constructor(items) {
		super(items, CpuInfoItem);
	}
}

module.exports = CpuInfoCollecion;