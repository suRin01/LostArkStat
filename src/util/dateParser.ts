export class dateParser {
	public static dbDateFormatter = (date: Date): string => {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	};
}
