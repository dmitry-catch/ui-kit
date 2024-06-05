<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, toRefs, watch } from 'vue'
import CharCounter from '../../data-display/CharCounter/CharCounter.vue'

interface TextareaProps {
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
	/** Высота поля в строках текста  */
	rows?: number
	/** Указывает замещающийся текст  */
	placeholder?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
	rows: 1,
	bordered: true,
	size: 'medium'
})

const {
	resizable,
	size,
	bordered,
	readonly,
	disabled,
	required,
	autofocus,
	maxLength,
	minLength,
	transparent,
	rows,
	placeholder,
	showCounter
} = toRefs(props)

const content = defineModel<string>({ required: false })

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const adjustHeight = (element: HTMLTextAreaElement) => {
	element.style.height = 'auto'
	element.style.height = `${element.scrollHeight}px`
}

const handleInput = () => {
	if (textareaRef.value) {
		adjustHeight(textareaRef.value)
	}
}

onMounted(() => {
	if (textareaRef.value) {
		adjustHeight(textareaRef.value)
		textareaRef.value.addEventListener('input', handleInput)
	}
})

onBeforeUnmount(() => {
	if (textareaRef.value) {
		textareaRef.value.removeEventListener('input', handleInput)
	}
})

watch(content, () => {
	if (textareaRef.value) {
		adjustHeight(textareaRef.value)
	}
})
</script>

<template>
	<div class="Textarea__wrapper">
		<textarea
			ref="textareaRef"
			v-model="content"
			:class="{
				borderless: !bordered,
				transparent: transparent,
				'text-small': size == 'small',
				'text-footnote': size == 'extra-small'
			}"
			:placeholder="placeholder"
			:autofocus="autofocus"
			:maxlength="maxLength"
			:minlength="minLength"
			:readonly="readonly"
			:disabled="disabled"
			:required="required"
			:rows="rows"
			@input="handleInput"
		></textarea>
		<CharCounter
			v-if="showCounter"
			:current="content?.length"
			:max="maxLength"
			:class="{
				'text-small': size == 'small',
				'text-footnote': size == 'extra-small'
			}"
		/>
	</div>
</template>

<style scoped>
.Textarea__wrapper {
	textarea {
		outline: none;
		border: var(--design-border-color-primary) 1px solid;
		padding: calc(1.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
		border-radius: var(--design-border-radius-control);
		background-color: var(--design-background-color-primary);
		height: auto;
		overflow: hidden;
		box-sizing: border-box;
		resize: v-bind('resizable ?? "none"');
		width: 100%;
		max-width: 100%;
	}

	textarea[disabled] {
		color: var(--design-text-color-secondary);
		cursor: not-allowed;
	}

	textarea.borderless {
		border: none;
	}

	textarea.transparent {
		background: transparent;
	}
}
</style>
