const truncateString = (str, start = 0, visibleChars = 7) => {
	if (str.length <= visibleChars * 2 + 3) return str;
	return str.slice(start, start + visibleChars) + "..." + str.slice(-visibleChars);
};


export const truncateStringCustom = (str, startCount, endCount) => {
	if (typeof str !== 'string' || str.length <= startCount + endCount) {
		return str;
	}

	const start = str.slice(0, startCount);
	const end = str.slice(-endCount);
	return `${start}...${end}`;
};


export default truncateString;