export class dateParser {
	public static dbDateParser = (stringDate: string): Date => {
		const yearIndex = 3;
		const monthIndex = 1;
		const dayIndex = 2;
		const dateArr = stringDate.split(",")[0]["/"];
		try {
			return new Date(
				Number.parseInt(dateArr[yearIndex]),
				Number.parseInt(dateArr[monthIndex]),
				Number.parseInt(dateArr[dayIndex]),
			);
		} catch {
			return new Date(0, 1, 1);
		}
	};

	public static dbDateFormatter = (date: Date): string => {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	};
}
