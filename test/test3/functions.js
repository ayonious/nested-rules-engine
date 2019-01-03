const functions = {
	you_are_a_human: ({ type }) => {
		return type === 'human';
	},
	find_out_age: (inputs) => {
		const { ageType } = inputs;
		let age;
		if (ageType === 'adult') {
			age = 18;
		} else {
			age = 15;
		}
		inputs.age = age;
		return false;
	},
	default: () => {
		return true;
	},
	dummy: () => { },
	you_are_old_enough: ({ age }) => {
		return age >= 18;
	},
	buy_alcohol: () => {
		return {
			"productBought": "alcohol"
		}
	},
	buy_milk: () => {
		return {
			"productBought": "milk"
		}
	}
};

module.exports = functions;