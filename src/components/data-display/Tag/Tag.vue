<script setup lang="ts">
import { toRefs } from 'vue'
import { Icon, Button } from '../../../main'

interface TagProps {
	color?:
		| 'accent'
		| 'warning'
		| 'danger'
		| 'info'
		| 'aspid-blue'
		| 'cornflower'
		| 'honeysuckle'
		| 'orange'
		| 'ohra'
		| 'tiffany'
		| 'secondary'
		| 'dark'
		| 'borderless'
		| 'gray'
	size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
	icon?: string
	closable?: boolean
	squared?: boolean
}

const props = withDefaults(defineProps<TagProps>(), { color: 'gray', size: 'medium' })
const emit = defineEmits<{
	(e: 'close'): void
}>()

const { color, closable, squared } = toRefs(props)
</script>

<template>
	<div class="Tag text-medium" :class="{ 'Tag--squared': squared }" :color="color" :size="size">
		<Icon v-if="icon" :name="icon" />
		<slot></slot>
		<Button v-if="closable" class="icon functional" @click="emit('close')">
			<Icon name="close" />
		</Button>
	</div>
</template>

<style scoped>
.Tag {
	display: inline-flex;
	gap: var(--design-gap-unit);
	border-radius: var(--design-border-radius-tag);
	background: var(--design-background-color-secondary);
	padding: var(--design-gap-unit) calc(2.5 * var(--design-gap-unit));
	color: var(--design-text-color-on-accent-primary);
	::v-deep(*) {
		color: var(--design-text-color-on-accent-primary);
	}
}

.Tag--squared {
	border-radius: 4px;
}

.Tag[size='extra-small'] {
	padding: calc(0.1 * var(--design-gap-unit)) calc(1.5 * var(--design-gap-unit));
}
.Tag[size='small'] {
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
}
.Tag[size='large'] {
	padding: calc(1.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}
.Tag[size='extra-large'] {
	padding: calc(2 * var(--design-gap-unit)) calc(4 * var(--design-gap-unit));
}

.Tag[color='gray'] {
	background-color: var(--design-background-color-on-accent-primary);
}
.Tag[color='accent'] {
	background-color: var(--design-background-color-accent-primary);
}
.Tag[color='warning'] {
	background-color: var(--design-background-color-warning-primary);
}
.Tag[color='danger'] {
	background-color: var(--design-background-color-danger-primary);
}
.Tag[color='info'] {
	background-color: var(--design-background-color-info);
}
.Tag[color='aspid-blue'] {
	background-color: var(--design-additional-color-3);
}
.Tag[color='cornflower'] {
	background-color: var(--design-additional-color-1);
}
.Tag[color='honeysuckle'] {
	background-color: var(--design-additional-color-2);
}
.Tag[color='orange'] {
	background-color: var(--design-additional-color-5);
}
.Tag[color='ohra'] {
	background-color: var(--design-additional-color-6);
}
.Tag[color='tiffany'] {
	background-color: var(--design-additional-color-7);
}
.Tag[color='secondary'] {
	background-color: var(--design-background-color-secondary);
	border: 1px solid var(--design-border-color-baseline);
}
.Tag[color='dark'] {
	background-color: var(--design-background-color-inverted);
}
.Tag[color='borderless'] {
	background-color: var(--design-background-color-secondary);
}
.Tag[color='gray'],
.Tag[color='borderless'],
.Tag[color='secondary'] {
	color: var(--design-text-color-primary);
	::v-deep(*) {
		color: var(--design-text-color-primary);
	}
}
</style>
