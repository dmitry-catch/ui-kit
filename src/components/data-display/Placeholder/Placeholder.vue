<script setup lang="ts">
import { toRefs } from 'vue'
import ContentContainer from '../../layout/ContentContainer/ContentContainer.vue'
import Icon from '../../general/Icon/Icon.vue'
import Header from '../Header/Header.vue'

interface PlaceholderProps {
	header?: string
	description?: string
	icon?: string
	size?: 'small' | 'medium'
	empty?: boolean
}

const props = withDefaults(defineProps<PlaceholderProps>(), { icon: 'presentation', card: true, size: 'medium' })

const { header, description, icon, size, empty } = toRefs(props)
</script>

<template>
	<ContentContainer class="Placeholder" :size="size">
		<template v-if="!empty">
			<div class="placeholderIcon">
				<Icon :name="icon" />
			</div>
			<div class="textContent">
				<Header v-if="header && size == 'medium'" :level="3">{{ header }}</Header>
				<span v-if="description" class="secondary">{{ description }}</span>
			</div>
		</template>
		<div v-else class="empty"></div>
	</ContentContainer>
</template>

<style scoped>
.Placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: calc(2 * var(--design-gap-unit));
	text-align: center;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	.placeholderIcon {
		padding: calc(2 * var(--design-gap-unit));
		background-color: var(--design-background-color-accent-primary);
		border-radius: 50%;
	}
	.placeholderIcon:deep(*) {
		background-color: var(--design-background-color-accent-primary);
		color: var(--design-text-color-on-accent-primary);
	}
	.textContent {
		display: flex;
		max-width: 20vw;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--design-gap-unit);
	}
}

.Placeholder[size='small'] {
	gap: calc(1.25 * var(--design-gap-unit));

	.placeholderIcon {
		width: fit-content;
		padding: var(--design-gap-unit);
	}
}
</style>
