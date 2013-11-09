/*
 * 'Functional Javascript' exercises from nodeschool.io
 */

var toUpper = function(string) {
	return string.toUpperCase();
}

// module.exports = toUpper;

var repeatIter = function(fn, times) {
	for(var i = 0; i < times; ++i) {
		fn();
	}
}

var repeatRecur = function(fn, times) {
	if (times <= 0)
		return;

	fn();
	repeatRecur(fn, times-1);
}

//module.exports = repeatIter;
//module.exports = repeatRecur;

var doubleAllOriginal = function (numbers) {
	var result = []
	for (var i = 0; i < numbers.length; i++) {
		result.push(numbers[i] * 2)
	}
	return result
}

var doubleAllArrayMap = function (numbers) {
	var result = numbers.map(function(el){
		return el*2
	});

	return result;
}

//module.exports = doubleAllOriginal;
//module.exports = doubleAllArrayMap;

var getShortMessages = function (msgArr) {
	return msgArr.filter(function (el) {
		return el.message.length < 50;
	}).map(function(el) {
		return el.message;
	});
}

//console.log(getShortMessages([{message:"a"},{message:"bd"},{message:"c"}]));
//module.exports = getShortMessages;

var checkUsersValid = function (goodUsers) {
/*
	//console.log(goodUsers);
	goodUsers = goodUsers.map(function (el){
		return el.id;
	});
	return function (userArr) {
		return userArr.every(function (el) {
			//console.log(el);
			//console.log(goodUsers.indexOf(el.id));
			return goodUsers.indexOf(el.id) !== -1;
		});
	}
*/
	/* Better answer (per the workshop notes)*/
	return function(users) {
		return users.every(function (usersEl){
			return goodUsers.some(function (goodUsersEl) {
				return goodUsersEl.id === usersEl.id;
			});
		});
	};
}

var testCheckUsersValid = function () {
	var goodUsers =  [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 }
	];

	var fnValidateUsers = checkUsersValid(goodUsers);

	return fnValidateUsers([{id: 1},{id: 2},{id: 3}]);
};

//console.log(testCheckUsersValid());
//module.exports = checkUsersValid;

var reduceStep = function(prev_result, curr) {
	//console.log(JSON.stringify(prev, null, 4) + "-" + curr);
	prev_result[curr] = (typeof prev_result[curr] === 'undefined' ) ? 1 :  prev_result[curr] + 1;
	/* This way of evaluation was shown in the answer; IMHO, fugly */
	//prev[curr] = ++prev[curr] || 1;
	return prev_result;
};

var reduceCountWords = function (inputWords) {
	return inputWords.reduce(reduceStep, {});
}

var testReduceCountWords = function() {
	var words =  ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian'];

	console.log(reduceCountWords(words));
}

//testReduceCountWords();
//module.exports = reduceCountWords;

var reduceImpl = function (arr, callback, initial) {

	if (arr.length === 0) return new Object();

	var myImpl = function (arr, index, callback, prev_result) {
		if (index >= arr.length) return prev_result;

		prev_result = callback(prev_result, arr[index], index, arr);

		return myImpl(arr, index+1, callback, prev_result);
	}

	return myImpl(arr, 0, callback, new Object());
}

var testReduceImpl = function() {
	var words =  ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian'];

	var result = reduceImpl(words, reduceStep, []);

	console.log(result);
}

//testReduceImpl();
module.exports = reduceImpl;




