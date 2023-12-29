<script setup lang="ts">
import { toRefs } from 'vue'

interface SpinnerProps {
	/** Центрирование в контейнере */
	center?: boolean
	/** Инвертирование цветов */
	inverse?: boolean
	/** Скрытие отображения заднего фонa */
	backdrop?: boolean
	variant?: string
	size?: 'lg' | 'md' | 'sm' | 'xs' | 'xl'
	speed?: 'fast' | 'normal' | 'slow'
	vertical?: boolean
}

const props = withDefaults(defineProps<SpinnerProps>(), {
	variant: 'light',
	size: 'md',
	speed: 'normal'
})

const { variant, size, speed, inverse, center, backdrop } = toRefs(props)
</script>

<template>
	<div class="Spinner" :class="{ vertical, center, backdrop }">
		<div class="Spinner__content">
			<div class="Spinner__wheel" :class="{ inverse }" :variant="variant" :size="size" :speed="speed"></div>
			<div class="Spinner__hint" :class="{ inverse }">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style>
.Spinner {
	display: flex;
	align-items: center;
	justify-content: center;
}
.Spinner__content {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--design-gap-unit);
}
.Spinner.backdrop {
	position: relative;
}
.Spinner.backdrop:before {
	position: absolute;
	content: '';
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: white;
	opacity: 0.75;
}
.Spinner.backdrop .Spinner__content {
	position: absolute;
}
.Spinner.vertical .Spinner__content {
	flex-direction: column;
}
.Spinner__wheel {
	width: fit-content;
	min-height: var(--design-current-font-size);
	min-width: var(--design-current-font-size);
	border-radius: 50%;
	border: 2px solid var(--design-border-color-accent-primary);
	border-top-color: var(--design-background-color-primary);
	animation: spin 1.2s ease-in-out infinite;
}
.Spinner__wheel.inverse {
	border: 2px solid var(--design-background-color-primary);
	border-top-color: var(--design-border-color-accent-primary);
}
.Spinner__wheel[variant='dark'].inverse {
	border: 3px solid var(--design-border-color-accent-primary);
	border-top-color: var(--design-text-color-on-accent-tertiary);
}
.Spinner__hint.inverse {
	color: var(--design-text-color-on-accent-primary);
}
.Spinner__wheel[variant='dark'] {
	border: 3px solid var(--design-text-color-on-accent-tertiary);
	border-top-color: var(--design-border-color-accent-primary);
}
.Spinner__wheel[size='sm'] {
	height: calc(var(--design-font-size-footnote) * 0.75);
	width: calc(var(--design-font-size-footnote) * 0.75);
	min-height: 0;
	min-width: 0;
}
.Spinner__wheel[variant='dark'][size*='l'] {
	background-image: url(./src/spinner-large.svg);
	background-size: contain;
	background-repeat: no-repeat;
	border: none;
}
.Spinner__wheel[size='lg'] {
	height: calc(var(--design-font-size-large) * 2);
	width: calc(var(--design-font-size-large) * 2);
}
.Spinner__wheel[size='xs'] {
	min-height: 0;
	min-width: 0;
	height: calc(var(--design-font-size-hint) * 0.2);
	width: calc(var(--design-font-size-hint) * 0.2);
}
.Spinner__wheel[size='xl'] {
	height: 68px;
	width: 68px;
}
.Spinner__wheel[speed='slow'] {
	animation-duration: 1.75s;
}
.Spinner__wheel[speed='fast'] {
	animation-duration: 0.75s;
}
.Spinner.center {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: 100%;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
