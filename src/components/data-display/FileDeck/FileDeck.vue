<script setup lang="ts">
import { toRefs } from 'vue'
import FileCard from './components/FileCard.vue'

interface FileDeckProps {
	modelValue: Array<File>
	actionVariant?: 'delete' | 'upload'
}

const props = withDefaults(defineProps<FileDeckProps>(), {
	actionVariant: 'delete'
})

const emit = defineEmits(['update:modelValue', 'delete', 'upload'])
const { modelValue } = toRefs(props)
</script>
<template>
	<div class="FileDeck">
		<FileCard
			:variant="actionVariant"
			@delete="emit('delete', file)"
			@upload="emit('upload', file)"
			v-for="file in modelValue"
			:file="file"
		/>
	</div>
</template>
<style scoped>
.FileDeck {
	display: flex;
	flex-direction: column;
}
</style>
