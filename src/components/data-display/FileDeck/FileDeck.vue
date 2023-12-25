<script setup lang="ts">
import { toRefs } from 'vue'
import FileCard from './components/FileCard.vue'

interface FileDeckProps {
	modelValue: Array<null> | Array<File>
}

const props = defineProps<FileDeckProps>()

const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)
</script>
<template>
	<div class="FileDeck">
		<FileCard v-for="file in modelValue" :file="file" />
	</div>
</template>
<style scoped>
.FileDeck {
	display: flex;
	flex-direction: column;
}
</style>
