const truncateString = (str, start = 0, visibleChars = 4) => {
	if (str.length <= visibleChars * 2 + 3) return str;
	return str.slice(start, start + visibleChars) + "..." + str.slice(-visibleChars);
};

export default truncateString;