module.exports = function maskEmail(emailString, options) {
	'use strict';
	var maskingChar = (options && options.replacement)  || '*',
		allowedSublist = (options && options.allowed && options.allowed.source) || '@\."+',
		maskString = function (full, group, finalChar) {
			return group[0] + new Array(group.length).join(maskingChar) + finalChar;
		},
		regex = new RegExp('([^' + allowedSublist + ']+)([' + allowedSublist + '])', 'g');
	return emailString && emailString.replace(regex, maskString);
};
