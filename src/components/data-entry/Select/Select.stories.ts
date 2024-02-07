import { Meta, StoryObj } from '@storybook/vue3'
import Select from './Select.vue'

export default {
	component: Select,
	args: {
		modelValue: null,
		searchType: 'input',
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
			options: ['auto', 'input', 'popup', false]
		}
	}
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const Sizing: Story = {
	render: (args) => ({
		components: { Select },
		setup: () => ({ args }),
		template: `
		<div  v-bind:style="{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--design-gap-unit)'}">
			<Select v-bind='args' label="Medium" block />
			<Select v-bind='args' label="Small" size='small' block/>
			<Select v-bind='args' label="Extra-small" size='extra-small' block/>
		</div>	
			`
	})
}

export const SearchAuto: Story = {
	args: {
		modelValue: null,
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
		components: { Select },
		setup() {
			return { args }
		},
		template: `
		<Select v-bind="args">
		  <template #listItem="{ listItem }">
			<i>{{ listItem }}</i>
		  </template>
		</Select>
	  `
	})
}
