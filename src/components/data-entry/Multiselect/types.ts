import { SelectLoadContext, SelectOptionType } from '../types'

export interface MultiselectProps<TValue> {
	options: Array<SelectOptionType<TValue>>
	/** Если параметр = true, компонент подсветиться красным. Если тип параметра - строка, то подсказка заменится на эту строку и текст станет красным */
	invalid?: boolean | string
	/** Появляется астерикс над лейблом. Лейбл обязателен */
	required?: boolean
	loading?: boolean
	disabled?: boolean
	label?: string
	/** Подсказка */
	hint?: string
	/** Описание */
	description?: string
	placeholder?: string
	icon?: string
	/**
	 * false - поиск недоступен - default
	 * auto - если предоставлено более 10 вариантов, появляется поиск в выпадающем меню
	 * popup - поиск в выпадающем меню
	 */
	searchType?: false | 'auto' | 'popup'
	size?: 'extra-small' | 'small' | 'medium'
	/** Добавляет ограничение на минимальное колличество символов */
	searchMinLength?: number
	/** Добавляет счётчик символов и ограничение в попап поиск и просто ограничение в инпут поиск */
	searchMaxLength?: number
	/** Плейсхолдер для поиска в контекстном меню */
	popupPlaceholder?: string
	/** Флаг для ленивой загрузки */
	lazy?: boolean
	/**  Ограничение размера выпадающего списка по высоте в px*/
	height?: number | null
	/**  Ограничение размера выпадающего списка по колличеству элементов*/
	visibleItems?: number | null
}

export interface MultiselectEmits<TValue> {
	/** Обработчик события выпадающего меню */
	(e: 'open'): void
	/** Обработчик события ввода в строке поиска */
	(e: 'search', value: string): void
	/** Обработчик загрузки данных */
	(e: 'load', context: SelectLoadContext<TValue>): void
}

export interface MultiselectSlots {
	/**  Заголовок */
	label?: string | unknown
	/**Описание */
	description?: string | unknown
	/**  Невыбираемый фиксированный первый элемент выпадающего списка */
	listHeader?: string | unknown
	/**  Внутреннее наполнение выпадающего списка */
	listDefault?: unknown
	/**  Кастомный компонент для элемента выпадающего списка (передаётся параметр listItem типа DropdownItemType) */
	listItem?: (listItem: unknown) => unknown
	/**  Заголовок для группы элементов списка */
	listGroupLabel?: (listGroupLabel: unknown) => string | unknown
	/** Загрузить еще */
	loadMore?: (props: { load: () => void }) => any
	/**  Невыбираемый фиксированный последний элемент выпадающего списка */
	listFooter?: string | unknown
	/**  Место под фиксированный футер для контекстного меню */
	menuFooter?: string | unknown
	/**  Подсказка при отсутсвии совпадения поискового запроса и эементов списка */
	empty?: string | unknown
}
