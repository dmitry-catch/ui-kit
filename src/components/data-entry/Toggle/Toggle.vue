<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import Icon from '../../general/Icon/Icon.vue'
import { ToggleProps } from './types.js'
import { sizeParameters } from './sizeParameters.js'

const props = withDefaults(defineProps<ToggleProps>(), {
	size: 'medium'
})

const { disabled, block, checkedChildren, unCheckedChildren, iconChildren, size } = toRefs(props)

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
	right: model.value ? `${lineSize.value - (iconChildren.value ? 6 : 0)}px` : 'auto',
	left: model.value ? 'auto' : `${lineSize.value - (iconChildren.value ? 6 : 0)}px`
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
				<Icon
					v-if="iconChildren"
					class="icon"
					:name="model ? checkedChildren ?? '' : unCheckedChildren ?? ''"
				/>
				<span v-else class="description">
					{{ model ? checkedChildren : unCheckedChildren }}
				</span>
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
	}

	.content :deep(*) {
		color: var(--design-text-color-inverted);
		fill: var(--design-text-color-inverted);
	}

	.content[size='small'] .description {
		font-size: 14px;
	}

	.content[size='small'] .icon {
		--icon-size: 20px;
	}

	.content[size='extra-small'] .description {
		font-size: 10px;
		line-height: 14;
	}

	/* TODO: Temporary. While no fix Icon component */
	.content[size='extra-small'] .icon {
		--icon-size: 12px;
		padding: 0 2px;
		transform: translateY(-45%);
	}
}
</style>
