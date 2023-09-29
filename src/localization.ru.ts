import { DateLocalization } from './localization'

export class DateLocalizationRu implements DateLocalization {
	DateAbbr(): string {
		return 'ДД.ММ.ГГГГ'
	}

	January(): string {
		return 'Январь'
	}

	February(): string {
		return 'Февраль'
	}

	March(): string {
		return 'Март'
	}

	April(): string {
		return 'Апрель'
	}

	May(): string {
		return 'Май'
	}

	June(): string {
		return 'Июнь'
	}

	July(): string {
		return 'Июль'
	}

	August(): string {
		return 'Август'
	}

	September(): string {
		return 'Сентябрь'
	}

	October(): string {
		return 'Октябрь'
	}

	November(): string {
		return 'Ноябрь'
	}

	December(): string {
		return 'Декабрь'
	}

	MonthArray(): [string, string, string, string, string, string, string, string, string, string, string, string] {
		return [
			this.January(),
			this.February(),
			this.March(),
			this.April(),
			this.May(),
			this.June(),
			this.July(),
			this.August(),
			this.September(),
			this.October(),
			this.November(),
			this.December()
		]
	}

	Monday(): string {
		return 'Понедельник'
	}

	Tuesday(): string {
		return 'Вторник'
	}

	Wednesday(): string {
		return 'Среда'
	}

	Thursday(): string {
		return 'Четверг'
	}

	Friday(): string {
		return 'Пятница'
	}

	Saturday(): string {
		return 'Суббота'
	}

	Sunday(): string {
		return 'Воскресенье'
	}

	MondayAbbr(): string {
		return 'Пн'
	}

	TuesdayAbbr(): string {
		return 'Вт'
	}

	WednesdayAbbr(): string {
		return 'Ср'
	}

	ThursdayAbbr(): string {
		return 'Чт'
	}

	FridayAbbr(): string {
		return 'Пт'
	}

	SaturdayAbbr(): string {
		return 'Сб'
	}

	SundayAbbr(): string {
		return 'Вс'
	}

	WeekdayAbbrArray(): [string, string, string, string, string, string, string] {
		return [
			this.MondayAbbr(),
			this.TuesdayAbbr(),
			this.WednesdayAbbr(),
			this.ThursdayAbbr(),
			this.FridayAbbr(),
			this.SaturdayAbbr(),
			this.SundayAbbr()
		]
	}

	Today(): string {
		return 'Сегодня'
	}

	TimeFrom(): string {
		return 'с'
	}

	Calendar(): string {
		return 'Календарь'
	}
}
