const cloneDeep = require('lodash.clonedeep');
const update = require('./update');

const constructUpdatedObject = (defaultObject, modifiedObject) => {
	const updatedObject = cloneDeep(defaultObject);

	update(updatedObject, modifiedObject);
	return updatedObject;
};

module.exports = constructUpdatedObject;