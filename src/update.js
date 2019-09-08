const update = (updatedObject, modifiedObject) => {

	Object.keys(modifiedObject).forEach(key => {

		// delete property if set to undefined or null
		if ( undefined === modifiedObject[key] || null === modifiedObject[key] ) {
			delete updatedObject[key]
		}

		// property value is object, so recurse
		else if (
				'object' === typeof modifiedObject[key]
				&& !Array.isArray(modifiedObject[key])
		) {

			// target property not object, overwrite with empty object
			if (
				!('object' === typeof updatedObject[key]
				&& !Array.isArray(updatedObject[key]))
			) {
				updatedObject[key] = {}
			}

			// recurse
			update(updatedObject[key], modifiedObject[key])
		}

		// set target property to update property
		else {
			updatedObject[key] = modifiedObject[key]
		}
	})
}

module.exports = update;