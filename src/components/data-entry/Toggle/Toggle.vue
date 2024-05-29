<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { ToggleProps } from './types.js'

const sizeParameters = {
	medium: {
		TOGGLE_LINE_HEIGHT: 30,
		TOGGLE_WIDTH: 55,
		INDENT_VALUE: 4
	},
	small: {
		TOGGLE_LINE_HEIGHT: 24,
		TOGGLE_WIDTH: 44,
		INDENT_VALUE: 3
	},
	'extra-small': {
		TOGGLE_LINE_HEIGHT: 16,
		TOGGLE_WIDTH: 28,
		INDENT_VALUE: 2
	}
}

const props = withDefaults(defineProps<ToggleProps>(), {
	size: 'medium'
})

const { disabled, block, size } = toRefs(props)

const model = defineModel<boolean>()

const emits = defineEmits<{
	(e: 'click'): void
}>()

const rootToggle = ref<HTMLElement | null>(null)

const currentSize = computed(() => sizeParameters[size.value])

const lineSize = ref(currentSize.value.TOGGLE_LINE_HEIGHT)
const fixWidth = ref(currentSize.value.TOGGLE_WIDTH)
const indent = ref(currentSize.value.INDENT_VALUE)

const toggle = () => {
	if (!disabled.value) {
		model.value = !model.value
		emits('click')
	}
}

// Dynamic styles

const backgroundStyle = computed(() => ({
	width: block.value ? `auto` : `${fixWidth.value}px`,
	height: `${lineSize.value}px`,
	background: model.value ? `var(--design-text-color-accent)` : `var(--design-border-color-primary)`,
	opacity: disabled.value ? '0.7' : '1',
	cursor: !disabled.value ? 'pointer' : 'not-allowed'
}))

const dotStyle = computed(() => {
	const offsetWidth = rootToggle.value ? rootToggle.value.offsetWidth : 0
	return {
		background: 'var(--design-text-color-on-accent-primary)',
		width: `${lineSize.value - 2 * indent.value}px`,
		height: `${lineSize.value - 2 * indent.value}px`,
		'margin-left': model.value ? `${offsetWidth - (lineSize.value - indent.value)}px` : `${indent.value}px`
	}
})

const contentStyle = computed(() => ({
	right: model.value ? `${lineSize.value - 2}px` : 'auto',
	left: model.value ? 'auto' : `${lineSize.value - 2}px`
}))
</script>

<template>
	<span
		ref="rootToggle"
		class="Toggle"
		:style="backgroundStyle"
		role="switch"
		tabindex="0"
		:aria-checked="model"
		:aria-readonly="disabled"
		@keyup.enter.prevent="toggle"
		@click="toggle"
	>
		<span aria-hidden="true" :style="dotStyle" class="dot">
			<span class="content" :size="size" :style="contentStyle">
				<slot v-if="model" name="checked"></slot>
				<slot v-else name="unchecked"></slot>
			</span>
		</span>
	</span>
</template>

<style scoped>
.Toggle {
	display: flex;
	align-items: center;
	border-radius: 9999px;
	overflow: hidden;
	transition: background-color 0.2s, width 0.2s, height 0.2s;

	.dot {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: 50%;
		transition: margin 0.2s;
	}

	.content {
		position: absolute;
		user-select: none;
		white-space: nowrap;
		color: var(--design-text-color-inverted);
	}

	.content :deep(*) {
		fill: var(--design-text-color-inverted);
		--icon-size: 20px;
	}

	.content[size='small'] {
		font-size: 14px;
	}

	.content[size='extra-small'] {
		font-size: 10px;
	}

	.content[size='small'] :deep(.Icon) {
		--icon-size: 16px;

		/* TODO: Temporary. While no fix Icon component */
		transform: translateY(-10%);
	}

	.content[size='extra-small'] :deep(.Icon) {
		--icon-size: 10px;

		/* TODO: Temporary. While no fix Icon component */
		transform: translateY(-80%);
	}
}
</style>
