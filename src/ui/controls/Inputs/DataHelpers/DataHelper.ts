export const handleTwoDigitsInput = (maxPossibleValue: string, event: any, ref: any) => {
	const value = event.target.value
	if (Number(value) > Number(maxPossibleValue)) {
		ref.value = maxPossibleValue
	} else if (Number(value) < 0) {
		ref.value = '01'
	} else if (value.length > 2) {
		if (value.charAt(0) == '0') {
			ref.value = value.slice(1)
		} else {
			ref.value = maxPossibleValue
		}
	} else if (value.length == 1) {
		ref.value = '0' + value
	}

	if (!(String(ref.value).charAt(0) == '0')) {
		event.target.nextElementSibling.focus()
	}
}

export const handleYearInputEvent = (
	event: any,
	yearRef: any,
	afterEffect: any = (event: any) => event.target.blur()
) => {
	const value = event.target.value
	if (value.length > 4) {
		yearRef.value = value.slice(1)
	} else if (value.length < 4) {
		yearRef.value = '0'.repeat(4 - value.length) + value
	}
	if (String(yearRef.value).length >= 4 && !(String(yearRef.value).charAt(0) == '0')) {
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
	day = day ? day : '00'
	month = month ? month : '00'
	year = year ? year : '0000'
	if (isTime) {
		return `${year}-${month}-${day} ${time}`
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
