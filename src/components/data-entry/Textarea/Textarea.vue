<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, toRefs, watch } from 'vue'
import CharCounter from '../../data-display/CharCounter/CharCounter.vue'
import type { TextareaProps } from './types'

const props = withDefaults(defineProps<TextareaProps>(), {
	minRows: 1,
	maxRows: 7,
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
	minRows,
	maxRows,
	placeholder,
	showCounter
} = toRefs(props)

const content = defineModel<string>({ required: false })

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const adjustHeight = (element: HTMLTextAreaElement) => {
	element.style.height = 'auto'
	const scrollHeight = element.scrollHeight
	const lineHeight = parseInt(window.getComputedStyle(element).lineHeight)
	const rows = Math.floor(scrollHeight / lineHeight)
	if (rows > maxRows.value!) {
		element.style.height = `${lineHeight * maxRows.value!}px`
		element.style.overflowY = 'auto'
	} else {
		element.style.height = `${scrollHeight}px`
		element.style.overflowY = 'hidden'
	}
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
			:rows="minRows"
			@input="handleInput"
		></textarea>
		<CharCounter v-if="showCounter" :current="content?.length" :max="maxLength" :size="size" />
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
