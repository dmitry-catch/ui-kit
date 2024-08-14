<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'

interface ToggleProps {
	/** Не доступен для изменения */
	disabled?: boolean
	/** Занимает всю доступную ширину */
	block?: boolean
	/** Размер */
	size?: 'extra-small' | 'small' | 'medium'
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

const toggle = () => {
	if (!disabled.value) {
		model.value = !model.value
		emits('click')
	}
}

const toggleClasses = computed(() => ({
	'is-block': block.value,
	'is-checked': model.value,
	'is-disabled': disabled.value,
	[`size-${size.value}`]: true
}))

const dotClasses = computed(() => ({
	'is-checked': model.value,
	[`size-${size.value}`]: true
}))

const contentClasses = computed(() => ({
	[`size-${size.value}`]: true
}))
</script>

<template>
	<div ref="rootToggle" class="Toggle__wrapper" :class="{ 'is-block': block }" @click="toggle">
		<input
			v-model="model"
			type="checkbox"
			role="switch"
			:aria-checked="model"
			:aria-disabled="disabled"
			:disabled="disabled"
		/>
		<span :class="['Toggle', toggleClasses]">
			<span aria-hidden="true" :class="['dot', dotClasses]">
				<span class="content" :class="contentClasses">
					<slot v-if="model" name="checked"></slot>
					<slot v-else name="unchecked"></slot>
				</span>
			</span>
		</span>
	</div>
</template>

<style scoped>
.Toggle__wrapper {
	width: fit-content;
	.Toggle {
		display: flex;
		align-items: center;
		border-radius: 9999px;
		overflow: hidden;
		transition: background-color 0.2s, width 0.2s, height 0.2s;
		cursor: pointer;
		position: relative;

		--toggle-width-medium: 55px;
		--toggle-width-small: 44px;
		--toggle-width-extra-small: 28px;

		--toggle-height-medium: 30px;
		--toggle-height-small: 24px;
		--toggle-height-extra-small: 16px;

		--toggle-indent-medium: 4px;
		--toggle-indent-small: 3px;
		--toggle-indent-extra-small: 2px;

		.dot {
			display: flex;
			align-items: center;
			border-radius: 50%;
			transition: margin 0.2s;
			background: var(--design-text-color-on-accent-primary);
		}

		.dot.is-checked.size-medium {
			margin-left: calc(var(--toggle-width-medium) - var(--toggle-height-medium) + var(--toggle-indent-medium));
		}

		.dot.is-checked.size-small {
			margin-left: calc(var(--toggle-width-small) - var(--toggle-height-small) + var(--toggle-indent-small));
		}

		.dot.is-checked.size-extra-small {
			margin-left: calc(
				var(--toggle-width-extra-small) - var(--toggle-height-extra-small) + var(--toggle-indent-extra-small)
			);
		}

		.dot.is-checked .content {
			text-align: right;
		}

		.dot.size-medium .content {
			left: 30px;
			right: 0;
			line-height: 30px;
		}

		.dot.is-checked.size-medium .content {
			right: 30px;
			left: 0;
		}

		.dot.size-small .content {
			left: 24px;
			right: 0;
			line-height: 25px;
		}

		.dot.is-checked.size-small .content {
			right: 24px;
			left: 0;
		}

		.dot.size-extra-small .content {
			left: 16px;
			right: 0;
			line-height: 17px;
		}

		.dot.is-checked.size-extra-small .content {
			right: 16px;
			left: 0;
		}

		.content {
			user-select: none;
			white-space: nowrap;
			width: auto;
			position: absolute;
			color: var(--design-text-color-inverted);
		}

		.content :deep(*) {
			fill: var(--design-text-color-inverted);
		}

		.content.size-small {
			font-size: 14px;
		}

		.content.size-extra-small {
			font-size: 10px;
		}

		.content.size-medium :deep(.Icon) {
			transform: translateY(15%);
		}

		.content.size-small :deep(.Icon) {
			--icon-size: 20px;
			transform: translateY(10%);
		}

		.content.size-extra-small :deep(.Icon) {
			--icon-size: 12px;
			transform: translateY(-25%);
		}
	}

	input {
		opacity: 0;
		width: 0;
		height: 0;
		position: absolute;
	}

	.Toggle.is-disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.Toggle.is-checked {
		background: var(--design-text-color-accent);
	}

	.Toggle:not(.is-checked) {
		background: var(--design-border-color-primary);
	}

	.Toggle.is-block {
		width: auto;
	}

	.Toggle.is-block .dot.is-checked.size-medium {
		margin-left: calc(100% - var(--toggle-height-medium) + var(--toggle-indent-medium));
	}

	.Toggle.is-block .dot.is-checked.size-small {
		margin-left: calc(100% - var(--toggle-height-small) + var(--toggle-indent-small));
	}

	.Toggle.is-block .dot.is-checked.size-extra-small {
		margin-left: calc(100% - var(--toggle-height-extra-small) + var(--toggle-indent-extra-small));
	}

	/* Size */

	.size-medium {
		width: var(--toggle-width-medium);
		height: var(--toggle-height-medium);
	}

	.size-small {
		width: var(--toggle-width-small);
		height: var(--toggle-height-small);
	}

	.size-extra-small {
		width: var(--toggle-width-extra-small);
		height: var(--toggle-height-extra-small);
	}

	.size-medium .dot {
		width: calc(var(--toggle-height-medium) - 2 * var(--toggle-indent-medium));
		height: calc(var(--toggle-height-medium) - 2 * var(--toggle-indent-medium));
		margin-left: var(--toggle-indent-medium);
	}

	.size-small .dot {
		width: calc(var(--toggle-height-small) - 2 * var(--toggle-indent-small));
		height: calc(var(--toggle-height-small) - 2 * var(--toggle-indent-small));
		margin-left: var(--toggle-indent-small);
	}

	.size-extra-small .dot {
		width: calc(var(--toggle-height-extra-small) - 2 * var(--toggle-indent-extra-small));
		height: calc(var(--toggle-height-extra-small) - 2 * var(--toggle-indent-extra-small));
		margin-left: var(--toggle-indent-extra-small);
	}
}
.Toggle__wrapper.is-block {
	width: auto;
}
</style>
