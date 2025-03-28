export const handleTwoDigitsInput = (maxPossibleValue: string, value: string) => {
	let newValue = String(Math.max(0, Math.min(Number(value), Number(maxPossibleValue))))
	return newValue.length === 1 ? '0' + newValue : newValue
}

export const handleYearInputEvent = (value: string) => value.padStart(4, '0').slice(-4)

export const isInputEventTriggersEffect = (value: string) => (value.charAt(0) !== '0' ? true : false)

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
