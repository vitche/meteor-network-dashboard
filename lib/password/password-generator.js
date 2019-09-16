const generatePassword = require('password-generator');

const DEFAULT_LENGTH = 12;
const IS_MEMORABLE = false;
const DEFAULT_PATTERN = /[\w\d\?\-]/;

export const generateNewPassword = (length = DEFAULT_LENGTH, memorable = IS_MEMORABLE, pattern = DEFAULT_PATTERN) => {
	return generatePassword(length, memorable, pattern)
};