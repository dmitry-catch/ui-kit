<style>
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
}

h1 {
	font-size: 24px;
	line-height: 32px;
	font-weight: 600;
}

h2 {
	font-size: 20px;
	line-height: 28px;
	font-weight: 600;
}

h3 {
	font-size: 28px;
	line-height: 28px;
	font-weight: 600;
}

h4 {
	font-size: 16px;
	line-height: 24px;
	font-weight: 600;
}
</style>
<template>
	<template />
</template>

<script lang="ts">
import { computed, defineComponent, h, toRef } from 'vue'

export default defineComponent({
	props: {
		level: {
			type: Number,
			default: () => 1
		}
	},
	setup(props: { level: number }, { slots }) {
		const level = toRef(props, 'level')
		const header = computed(() => `h${level.value ?? 1}`)

		return () => h(header.value, slots.default != null ? slots.default() : [])
	}
})
</script>