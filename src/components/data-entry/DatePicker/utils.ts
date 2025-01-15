export const handleYearInputEvent = (value: string) => value.padStart(4, '0').slice(-4)

export const isInputEventTriggersEffect = (value: string) => value.charAt(0) !== '0'

export const getFirstDayOfMonth = (month: number, year: number) => {
	const firstDayOfMonth = new Date(year, month, 1).getDay()
	return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
}

export const getMonthArray = (month: number, year: number) => {
	const monthArray = []
	const firstDay = getFirstDayOfMonth(month, year)
	const numberOfDays = numberOfDaysInMonth(month, year)
	const numberOfDaysInPreviousMonth = numberOfDaysInMonth(month - 1, year)
	let day = 1
	for (let i = 0; i < 6; i++) {
		const week = []
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				week.push(numberOfDaysInPreviousMonth - firstDay + j + 1)
			} else if (day > numberOfDays) {
				week.push(day - numberOfDays)
				day++
			} else {
				week.push(day)
				day++
			}
		}
		monthArray.push(week)
	}
	return monthArray
}

export const numberOfDaysInMonth = (month: number, year: number) => {
	return new Date(year, month + 1, 0).getDate()
}
export const callSelectOnElement = (event: Event) => {
	const target = event.target as HTMLInputElement | null
	target?.select()
}

export const handleInitialDateValue = (value: string | Date | undefined): Date | null => {
	if (!value) return null
	else if (typeof value == 'string') {
		const date = new Date(String(value).split('T')[0])
		return isNaN(date.getTime()) ? null : date
	} else if (value instanceof Date) {
		const date = new Date(value.toDateString())
		return isNaN(date.getTime()) ? null : date
	} else return null
}

export const handleInternalValue = (value: Date | undefined | null): string | null => {
	if (value instanceof Date) {
		const day = String(value.getDate()).padStart(2, '0')
		const month = String(Number(value.getMonth()) + 1).padStart(2, '0')
		const year = value.getFullYear()
		return [year, month, day].join('-')
	}
	return null
}
