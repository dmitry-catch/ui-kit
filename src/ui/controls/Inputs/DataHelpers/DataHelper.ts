export const handleTwoDigitsInput = (maxPossibleValue: string, event: any, ref: any) => {
	let value = String(Math.max(0, Math.min(Number(event.target.value), Number(maxPossibleValue))))
	ref.value = value.length === 1 ? '0' + value : value

	if (ref.value.charAt(0) !== '0') {
		event.target.nextElementSibling.focus()
	}
}

export const handleYearInputEvent = (
	event: any,
	yearRef: any,
	afterEffect: any = (event: any) => event.target.blur()
) => {
	let value = String(event.target.value).padStart(4, '0')
	yearRef.value = value.slice(-4)

	if (yearRef.value.charAt(0) !== '0') {
		afterEffect(event)
	}
}

export const handleDayInputEvent = (event: any, yearValue: string, monthValue: string, dayRef: any) => {
	const maxPossibleValue = new Date(Number(yearValue), Number(monthValue), 0).getDate()
	handleTwoDigitsInput(maxPossibleValue.toString(), event, dayRef)
}

export const dateTimeStyling = (values: Array<string>, disabled: boolean | undefined) => {
	const isActive = values.some((value) => /\d/.test(value))
	return `${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`
}

export const handleInputFocus = (event: any) => event.target.select()

export const formatToRequiredFormat = (
	day: string,
	month: string,
	year: string,
	isTime: boolean = false,
	time?: string
) => {
	day = String(day).padStart(2, '0')
	month = String(month).padStart(2, '0')
	year = String(year).padStart(4, '0')

	if (isTime) {
		return `${year}-${month}-${day} ${time || ''}`
	}

	return `${year}-${month}-${day}`
}

export const formatToRequiredFormatRange = (
	dayFrom: string,
	monthFrom: string,
	yearFrom: string,
	dayTo: string,
	monthTo: string,
	yearTo: string
) => {
	dayFrom = dayFrom ? dayFrom : '00'
	monthFrom = monthFrom ? monthFrom : '00'
	yearFrom = yearFrom ? yearFrom : '0000'
	dayTo = dayTo ? dayTo : '00'
	monthTo = monthTo ? monthTo : '00'
	yearTo = yearTo ? yearTo : '0000'
	return `${yearFrom}-${monthFrom}-${dayFrom} , ${yearTo}-${monthTo}-${dayTo}`
}

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
