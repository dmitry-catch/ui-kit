import { Meta, StoryObj } from '@storybook/vue3'
import Toggle from './Toggle.vue'

export default {
	component: Toggle,
	args: {
		modelValue: true,
		disabled: false,
		block: false,
		checkedChildren: '',
		unCheckedChildren: '',
		iconChildren: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['extra-small', 'small', 'medium']
		}
	}
} satisfies Meta<typeof Toggle>

type Story = StoryObj<typeof Toggle>

export const Default: Story = {}

export const SwitchOff: Story = {
	args: {
		modelValue: false
	}
}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

export const DisabledSwicthOff: Story = {
	args: {
		disabled: true,
		modelValue: false
	}
}

export const TextContent: Story = {
	args: {
		checkedChildren: 'Open',
		unCheckedChildren: 'Close',
		block: true
	},
	render: (args) => ({
		components: { Toggle },
		setup() {
			return { args }
		},
		template: `
		<div :style="{ width: 85 + 'px'}">
		    <Toggle v-bind="args" />
		</div>
	  `
	})
}

export const IconContent: Story = {
	args: {
		checkedChildren: 'check',
		unCheckedChildren: 'close',
		iconChildren: true
	}
}

export const block: Story = {
	args: {
		block: true
	}
}

export const Small: Story = {
	args: {
		size: 'small'
	},
	render: (args) => ({
		components: { Toggle },
		setup() {
			return { args }
		},
		template: `
		    <Toggle
                v-bind="args"
                checkedChildren="1"
                unCheckedChildren="0"
                :style="{ marginBottom: 8 + 'px'}"
            />
		    <Toggle
                v-bind="args"
                checkedChildren="add"
                unCheckedChildren="remove"
                iconChildren
                :style="{ marginBottom: 8 + 'px'}"
            />
		    <Toggle v-bind="args" />
	  `
	})
}

export const ExtraSmall: Story = {
	args: {
		size: 'extra-small'
	},
	render: (args) => ({
		components: { Toggle },
		setup() {
			return { args }
		},
		template: `
		    <Toggle 
                v-bind="args"
                checkedChildren="Y"
                unCheckedChildren="N"
                :style="{ marginBottom: 4 + 'px'}"
            />
		    <Toggle
                v-bind="args"
                checkedChildren="chevron_up"
                unCheckedChildren="chevron_down"
                iconChildren
                :style="{ marginBottom: 4 + 'px'}"
            />
		    <Toggle v-bind="args" />
	  `
	})
}
