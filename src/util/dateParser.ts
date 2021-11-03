export class dateParser {
	public static dbDateParser = (stringDate: string): Date => {
		const dateArr = stringDate.split(",")[0]["/"];
		try {
			return new Date(
				Number.parseInt(dateArr[3]),
				Number.parseInt(dateArr[1]),
				Number.parseInt(dateArr[2]),
			);
		} catch {
			return new Date(0, 1, 1);
		}
	};

	public static dbDateFormatter = (date: Date): string => {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	};
}
