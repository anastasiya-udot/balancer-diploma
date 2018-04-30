import constants from '../../../../common/constants';

const conn = constants.CONNECTION;
const base = {
	url: `${conn.PROTOCOL}://${conn.HOST}:${conn.PORT}/${conn.PREFIX}`
};

export default base;