<style>
@import 'field.css';
.Multiselect {
	--icon-size: var(--design-current-line-height);
}
.Multiselect__visibleInput.Field__visibleInput {
	height: 40px;
	display: flex;
	padding: calc(0.5 * var(--design-gap-unit)) var(--design-gap-unit);
	align-items: center;
}
.Multiselect__clearHandle {
	margin-inline-start: auto;
}
.Multiselect__removeVariant {
}
.Multiselect__clearHandle.hidden {
	visibility: hidden;
}
.Multiselect__dropdown {
	position: fixed;
	width: 100%;
	max-height: 600px;
	overflow: auto;
	z-index: var(--dropdown-z-index, 1000);
	padding-top: var(--design-gap-unit);
	padding-bottom: var(--design-gap-unit);

	background: var(--design-background-color-primary);
	border-color: var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
	border-width: 1px;
	border-style: solid;
	box-sizing: border-box;
	max-height: 100%;
	max-width: 100%;
	overflow: auto;

	width: calc(v-bind(fieldWidth));
	transform: translateY(calc(var(--design-gap-unit) / 2));
}
.Multiselect__dropdownItem {
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
}
.Multiselect__dropdownItem:is(:hover, :focus, :focus-visible) {
	background: var(--design-background-color-secondary);
}
</style>

<template>
	<div class="Multiselect" @focusout="focusout" ref="root">
		<div class="Field" ref="field">
			<span class="Field__label"><slot name="label"></slot></span>
			<span class="Field__description text-small"><slot name="description"></slot></span>
			<div class="Multiselect__visibleInput Field__visibleInput">
				<div v-if="hasSelectedValue">
					<Pill class="control">
						<div>{{ selectedText }}</div>
						<Icon class="Multiselect__removeVariant" name="close"></Icon>
					</Pill>
				</div>
				<Btn
					class="Multiselect__clearHandle icon functional"
					:class="{ hidden: !hasSelectedValue }"
					@click="clearSelection"
				>
					<Icon name="close"></Icon>
				</Btn>
				<Btn class="Multiselect__dropdownHandle icon functional" @click="toggleDropdown">
					<Icon v-if="dropdownOpened" name="arrow_down"></Icon>
					<Icon v-else name="arrow_up"></Icon>
				</Btn>
			</div>
		</div>
		<div v-show="dropdownOpened" class="Multiselect__dropdown" ref="dropdown">
			<div v-for="option of options" :key="option.value" class="Multiselect__dropdownItem">
				<Checkbox v-model="selectedValue" :value="option.value">{{ option.name }}</Checkbox>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, toRefs } from 'vue'
import Icon from '../../icons/Icon.vue'
import Pill from '../../text/Pill.vue'
import Btn from '../Buttons/Btn.vue'
import Checkbox from './Checkbox.vue'
import { FieldLocalization } from '../../../localization'
const localization = inject<FieldLocalization>('FieldLocalization')
const props = defineProps<{
	modelValue: Array<any>
	options: Array<{ name: string; value: any }>
}>()

const emit = defineEmits(['update:modelValue'])
const { modelValue, options } = toRefs(props)
const root = ref<HTMLElement>()
const selectedValue = computed({
	get() {
		return modelValue.value
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
const selectedText = computed(() => {
	if (modelValue.value.length === 1) return options.value.find((it) => modelValue.value.includes(it.value))?.name
	if (localization?.CountValues != null) return localization.CountValues(modelValue.value.length)
	return `${modelValue.value.length} значения`
})

const hasSelectedValue = computed(() => modelValue.value?.length != null && modelValue.value?.length > 0)

const clearSelection = () => emit('update:modelValue', [])

const field = ref<HTMLElement>()
const fieldWidth = ref(field.value?.clientWidth + 'px')

const dropdown = ref<HTMLElement>()
const dropdownOpened = ref(false)
const toggleDropdown = () => {
	dropdownOpened.value = !dropdownOpened.value
	fieldWidth.value = field.value?.clientWidth + 'px'
}
const close = () => (dropdownOpened.value = false)
const clickOutsideDropdown = (event: MouseEvent) => {
	if ((event.path || event.composedPath()).includes(root.value)) return

	close()
}
const focusout = (event: FocusEvent) => {
	setTimeout(() => {
		let el = document.activeElement
		while (el != null) {
			console.log(el)
			if (el == (root.value as Element)) return
			el = el.parentElement
		}
		console.log('focus close')
		close()
	}, 150)
}
onMounted(() => {
	document.addEventListener('click', clickOutsideDropdown)
})
</script>
