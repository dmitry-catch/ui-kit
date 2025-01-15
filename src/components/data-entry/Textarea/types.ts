export interface TextareaProps {
	/** Задает ось resize'а или отключает resize */
	resizable?: 'horizontal' | 'vertical' | 'both'
	/** Размер текста в поле и в счетчике символов */
	size?: 'extra-small' | 'small' | 'medium'
	/** Регулирует прозрачность подложки */
	transparent?: boolean
	/** Отображение счетчика символов */
	showCounter?: boolean
	/** Задает св-во read-only  */
	readonly?: boolean
	/** Блокирует доступ и изменение textarea  */
	disabled?: boolean
	/** Рамочный/безрамочный вариант  */
	bordered?: boolean
	/** Обязательное для заполнения поле  */
	required?: boolean
	/** Автоматическое получение фокуса  */
	autofocus?: boolean
	/** Максимальное число введенных символов  */
	maxLength?: number
	/** Минимальное число введенных символов  */
	minLength?: number
	/** Минимальное число строк текста  */
	minRows?: number
	/** Максимальное число строк текста  */
	maxRows?: number
	/** Указывает замещающийся текст  */
	placeholder?: string
}
