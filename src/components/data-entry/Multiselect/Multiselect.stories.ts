import { Meta, StoryObj } from '@storybook/vue3'
import Multiselect from './Multiselect.vue'

export default {
	args: {
		modelValue: [],
		searchType: false,
		size: 'medium',
		options: [
			{ name: 'Option 1', value: 1 },
			{ name: 'Option 2', value: 2 },
			{ name: 'Option 3', value: 3 }
		],
		disabled: false,
		invalid: false,
		required: false,
		loading: false,
		hint: '',
		label: '',
		icon: '',
		placeholder: '',
		description: ''
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['extra-small', 'small', 'medium']
		},
		searchType: {
			control: 'select',
			options: ['auto', 'popup', false]
		}
	},
	component: Multiselect
} satisfies Meta<typeof Multiselect>

type Story = StoryObj<typeof Multiselect>

export const Default: Story = {}

export const Searchable: Story = { args: { searchType: 'popup' } }

export const LegacyLabelSlot: Story = {
	render: (args) => ({
		components: { Multiselect },
		setup: () => ({ args }),
		template: `
	
			<Multiselect v-bind='args' block >
			<template #label>Some label</template> 
			</Multiselect>
			`
	})
}

export const Sizing: Story = {
	render: (args) => ({
		components: { Multiselect },
		setup: () => ({ args }),
		template: `
		<div  v-bind:style="{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--design-gap-unit)'}">
			<Multiselect v-bind='args' label="Medium" block />
			<Multiselect v-bind='args' label="Small" size='small' block/>
			<Multiselect v-bind='args' label="Extra-small" size='extra-small' block/>
		</div>	
			`
	})
}

export const SearchAuto: Story = {
	args: {
		modelValue: [],
		searchType: 'auto',
		options: [
			{ name: 'Option 1', value: 1 },
			{ name: 'Option 2', value: 2 },
			{ name: 'Option 3', value: 3 },
			{ name: 'Option 4', value: 4 },
			{ name: 'Option 5', value: 5 },
			{ name: 'Option 6', value: 6 },
			{ name: 'Option 7', value: 7 },
			{ name: 'Option 8', value: 8 },
			{ name: 'Option 9', value: 9 },
			{ name: 'Option 10', value: 10 },
			{ name: 'Option 111', value: 11 }
		]
	}
}

export const ListItemsSlotted: Story = {
	render: (args) => ({
		components: { Multiselect },
		setup() {
			return { args }
		},
		template: `
		<Multiselect v-bind="args">
		  <template #listItem="{ listItem }">
			<i>{{ listItem }}</i>
		  </template>
		</Multiselect>
	  `
	})
}
