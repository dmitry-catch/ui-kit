export interface Localization {
	Date(): DateLocalization
	Field(): FieldLocalization
}

/*
 January - 31 days
 February - 28 days in a common year and 29 days in leap years
 March - 31 days
 April - 30 days
 May - 31 days
 June - 30 days
 July - 31 days
 August - 31 days
 September - 30 days
 October - 31 days
 November - 30 days
 December - 31 days
 */
export interface DateLocalization {
	DateAbbr(): Array<string>
	January(): string
	February(): string
	April(): string
	May(): string
	June(): string
	July(): string
	August(): string
	September(): string
	October(): string
	November(): string
	December(): string
	MonthArray(): [string, string, string, string, string, string, string, string, string, string, string, string]

	/*
	 Mo., Mon.
	 Tu., Tue., Tues.
	 We., Wed.
	 Th., Thu., Thur., Thurs.
	 Fr., Fri.
	 Sa., Sat.
	 Su., Sun.
	 Monday, Tuesday, Wednesday, Thursday, Friday
	 Saturday, Sunday
	 */
	Monday(): string
	Tuesday(): string
	Wednesday(): string
	Thursday(): string
	Friday(): string
	Saturday(): string
	Sunday(): string

	MondayAbbr(): string
	TuesdayAbbr(): string
	WednesdayAbbr(): string
	ThursdayAbbr(): string
	FridayAbbr(): string
	SaturdayAbbr(): string
	SundayAbbr(): string

	WeekdayAbbrArray(): [string, string, string, string, string, string, string]

	Today(): string

	Apply(): string

	Reset(): string

	Calendar(): string
}

export interface FieldLocalization {
	CountValues(count: number): string
}
