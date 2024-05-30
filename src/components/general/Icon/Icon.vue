<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue'

const props = defineProps({ name: { required: true, type: String } })
const { name } = toRefs(props)

const svgContent = ref<string>('')

watchEffect(async () => {
	try {
		svgContent.value = (await import(`../../../../icons/${name?.value}-24px.svg?raw`)).default
	} catch (e) {
		svgContent.value = ''
	}
})
</script>

<template>
	<div class="Icon" v-html="svgContent"></div>
</template>

<style scoped>
.Icon {
	fill: var(--icon-color, currentColor);
	width: var(--icon-size, var(--design-current-line-height, 1em));
	height: var(--icon-size, var(--design-current-line-height, 1em));
}

.Icon.accent {
	fill: var(--icon-color, var(--design-text-color-accent, currentColor));
}

.Icon svg {
	width: 100%;
	height: 100%;
}
</style>
