<style>
.DropdownSelect {
	position: relative;
}

.DropdownSelect:focus {
	outline: none;
}

.DropdownSelect:focus-within {
	outline: none;
	--forced-focus-outline: var(--design-focus-outline);
}

.DropdownSelect__field {
	display: flex;
}

.DropdownSelect__openButton {
	margin-inline-start: auto;
}

.DropdownSelect__dropdown {
	position: fixed;
	width: 100%;
	max-height: 600px;
	overflow: auto;
	z-index: var(--dropdown-z-index, 1000);
	padding-top: var(--design-gap-unit);
}

.DropdownSelect__value {
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
}

.DropdownSelect__value:is(:hover, .active, :focus, :focus-visible) {
	background: var(--design-background-color-secondary);
}

.DropdownSelect__values {
	display: flex;
	flex-flow: column;
}

.DropdownSelect__searchFieldWrapper {
	padding: calc(var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}

.DropdownSelect__dropdownSurface {
	background: var(--design-background-color-primary);
	border-color: var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
	border-width: 1px;
	border-style: solid;
	box-sizing: border-box;
	max-height: 100%;
	max-width: 100%;
	overflow: auto;
}
</style>

<template>
	<div
		ref="root"
		class="DropdownSelect"
		@keydown.down.prevent="downHandler"
		@keydown.up.prevent="upHandler"
		@keydown.enter="enterHandler"
		@keydown.esc="escapeHandler"
	>
		<TextField
			:modelValue="name"
			:placeholder="placeholder"
			readonly
			class="DropdownSelect__field"
			role="combobox"
			:aria-controls="listId"
			:aria-activedescendant="activeDescendant"
			:aria-expanded="opened"
			aria-readonly="true"
			aria-haspopup="listbox"
			:label="label"
		>
			<template #before>
				<Icon name="search"></Icon>
			</template>
			<template #after>
				<slot name="after"></slot>
				<div class="DropdownSelect__openButton" @click="toggle">
					<Icon v-if="opened" name="arrow_down"></Icon>
					<Icon v-else name="arrow_up"></Icon>
				</div>
			</template>
		</TextField>
		<div v-if="opened" :id="listId" class="DropdownSelect__dropdown" role="listbox">
			<div class="DropdownSelect__dropdownSurface">
				<div class="DropdownSelect__searchFieldWrapper"></div>
				<div class="DropdownSelect__values">
					<div
						v-for="option of options"
						:id="optionId(option)"
						:key="option.name"
						class="DropdownSelect__value"
						:class="{ selected: isSelected(option), active: isActive(option) }"
						role="option"
						:aria-selected="isSelected(option)"
						@click="itemClickHandler(option)"
					>
						<slot
							name="dropdownItem"
							:option="option"
							:selected="isSelected(option)"
							:active="isActive(option)"
							>{{ option.name }}
						</slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../general/Icon/Icon.vue'
import { computed, ref, toRefs } from 'vue'
import TextField from '../TextField/TextField.vue'
import { useUniqueId } from '../../../utils/useUniqueId.js'

interface SelectProps {
	placeholder?: string
	label?: string
	options?: Array<{ name: string; value: any }>
	modelValue?: any
}

const props = withDefaults(defineProps<SelectProps>(), {
	options: () => []
})
const emit = defineEmits(['update:model-value'])

const { getRandomId } = useUniqueId('DropdownSelect')
const root = ref<HTMLElement>()
const listId = getRandomId()
const optionId = (option: any) => `${listId}-option-${option.value}`

const { modelValue, options } = toRefs(props)
const opened = ref(false)
const value = computed({ get: () => modelValue.value, set: (value) => emit('update:model-value', value) })
const name = computed(() => options.value.find((it) => it.value === modelValue.value)?.name ?? '')
const active = ref(0)
const activeDescendant = computed(() => {
	const value = active.value
	if (root.value) return root.value!.querySelector(`.DropdownSelect__value:nth-child(${value + 1})`)?.id
})
const open = () => (opened.value = true)
const close = () => ((opened.value = false), root.value!.focus())
const toggle = () => (opened.value ? close() : open())

const select = (option: any) => (value.value = option.value)
const isSelected = (option: any) => value.value === option.value
const isActive = (option: any) => active.value === options.value.indexOf(option)
const lastIndex = (array: any) => Math.max(array.length - 1, 0)
const nextActive = () => {
	active.value++
	if (active.value >= options.value.length) active.value = 0
}
const previousActive = () => {
	if (active.value === 0) active.value = lastIndex(options.value)
	else active.value--
}
const downHandler = () => {
	if (!opened.value) {
		open()
		active.value = 0
	} else {
		nextActive()
	}
}
const upHandler = () => {
	if (!opened.value) {
		open()
		active.value = lastIndex(options)
	} else {
		previousActive()
	}
}
const enterHandler = () => {
	console.log('enterHandler', opened.value, active.value)
	if (opened.value) {
		select(options.value[active.value])
		close()
	}
}
const escapeHandler = () => {
	close()
}

const itemClickHandler = (option: any) => {
	select(option)
	close()
}
</script>
