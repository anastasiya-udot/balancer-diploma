var size_units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
var speed_units = ['Bps', 'KBps', 'MBps', 'GBps', 'TBps', 'PBps', 'ZBps', 'YBps'];

var enum_size = {
	bytes: 'Bytes',
	kb: 'KB',
	mb: 'MB',
	gb: 'GB',
	tb: 'TB',
	pb: 'PB',
	eb: 'EB',
	zb: 'ZB',
	yb: 'YB'
};
var enum_speed = {
	bps: 'Bps',
	kbps: 'KBps',
	mbps: 'MBps',
	gbps: 'GBps',
	tbps: 'TBps',
	pbps: 'PBps',
	zbps: 'ZBps',
	ybps: 'YBps'
};

var enum_units = {
	speed: 'speed',
	size: 'size'
};

function getModeArray(mode) {
	switch (mode) {
		case 'speed':
			return speed_units;
		case 'size':
			return size_units;
	}
	return [];
}

function getUnitsEnum(mode) {
	switch (mode) {
		case 'speed':
			return enum_speed;
		case 'size':
			return enum_size;
	}
	return {};
}

function getUnitsIndex(unitsArray, unitsEnum, units) {
	var result = -1;

	if (typeof units === 'number') {
		if (unitsArray[units]) {
			result = units;
		}
	} else {
		units = unitsEnum[units.toLowerCase()];
		result = unitsArray.indexOf(units);
	}
	return result;
}

function convertToUnits(value, mode, fromUnits, toUnits, objReturn, toFixed) {
	var i;
	var unitsArray = getModeArray(mode);
	var unitsEnum = getUnitsEnum(mode);
	var iFrom;
	var iTo;
	var result = {};

	fromUnits = fromUnits || 0;
	toUnits = toUnits || (value >= 1024 ? Math.floor(Math.log(value) / Math.log(1024)) : 0);

	iFrom = getUnitsIndex(unitsArray, unitsEnum, fromUnits);
	iTo = getUnitsIndex(unitsArray, unitsEnum, toUnits);

	i = iTo - iFrom;
	if (toFixed !== 0) {
		toFixed = toFixed || (i ? 1 : 0);
	}

	result.value = (value / Math.pow(1024, i)).toFixed(toFixed) || 'wrong value';
	result.index = iTo;
	result.units = unitsArray[iTo] || 'unknown';

	if (!objReturn) {
		return result.value + ' ' + result.units;
	}
	return result;
}

function checkModeUnits(bytes, size, showZero, mode, objReturn, toFixed) {
	var i;
	var result = {};
	var unitsArray = getModeArray(mode);

	bytes = parseFloat(bytes);
	if (!bytes) {
		if (!showZero) return '';
		bytes = 0;
	}

	if (typeof size === 'number') {
		i = size;
	} else if (bytes === 0) {
		i = 0;
	} else {
		i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	}

	toFixed = toFixed || (i ? 1 : 0);

	result.value = (bytes / Math.pow(1024, i)).toFixed(toFixed);
	result.index = i;

	result.units = unitsArray[i];

	if (!objReturn) {
		return result.value + ' ' + result.units;
	}

	return result;
}

module.exports = {
	convertToSpeedUnits: function(value, fromUnits, toUnits, objReturn, toFixed) {
		return convertToUnits(value, enum_units.speed, fromUnits, toUnits, objReturn, toFixed);
	},
	convertToSizeUnits: function(value, fromUnits, toUnits, objReturn, toFixed) {
		return convertToUnits(value, enum_units.size, fromUnits, toUnits, objReturn, toFixed);
	},
	formatFilesize: function(bytes, size, showZero, objReturn, toFixed) {
		return checkModeUnits(bytes, size, showZero, enum_units.size, objReturn, toFixed);
	},
	formatSpeed: function(bytes, size, showZero, objReturn, toFixed) {
		return checkModeUnits(bytes, size, showZero, enum_units.speed, objReturn, toFixed);
	}
};