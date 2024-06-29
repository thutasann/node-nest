/** Format the date as "Mon DD, YYYY" */
export function formatDate(dateString: any) {
	const date = new Date(dateString);

	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'short' });
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
}
