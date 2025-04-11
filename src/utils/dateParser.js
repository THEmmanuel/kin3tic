export const dateParser = (isoString) => {
	if (!isoString) return 'Invalid date';

	const date = new Date(isoString);
	if (isNaN(date.getTime())) return 'Invalid date';

	const pad = (num) => String(num).padStart(2, '0');

	const day = pad(date.getDate());
	const month = pad(date.getMonth() + 1); // Months are 0-indexed
	const year = date.getFullYear();
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${day}.${month}.${year}. ${hours}:${minutes}:${seconds}`;
};