const functions = {
	you_are_a_human: ({type}) => {
		console.log('you_are_a_human');
		return type === 'human';
	},
	you_are_not_racist: ({racismLevel}) => {
		console.log('you_are_a_human');
		return racismLevel < 10;
	},
	you_are_smart: ({iqLevel}) => {
		console.log('you_are_a_human', iqLevel);
		return iqLevel > 300;
	},
	you_are_kind: ({kindnessLevel}) => {
		console.log('you_are_kind');
		return kindnessLevel > 300;
	},
	you_are_older_than_15: ({age}) => {
		console.log('you_are_older_than_15');
		return age > 15;
	},
	you_live_near_my_house: ({postcode}) => {
		console.log('you_live_near_my_house');
		return postcode === 12223;
	},
	you_like_people: ({curiosityLevel}) => {
		console.log('you_like_people');
		return curiosityLevel > 300;
	},
	please_do_my_homework: () => {
		return {
			payload: 'doing homework',
			effort: 'im getting sick'
		};
	},
	you_must_be_something: () => {
		return {
			payload: 'data',
			effort: 'infinity'
		};
	},
	you_feel_good: ({feeling}) => {
		return feeling === 'good';
	},
	you_feel_shit: ({feeling}) => {
		return feeling !== 'good';
	},
	you_have_temperature: ({temp}) => {
		return temp > 100;
	},
	you_dont_have_temperature: ({temp}) => {
		return temp < 100;
	},
	goto_doctor: () => {
		return {
			getting: 'my car',
			finding: 'my phone'
		};
	}
};

module.exports = functions;