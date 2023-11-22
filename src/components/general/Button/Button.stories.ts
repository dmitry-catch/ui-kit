import { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'
import Icon from '../Icon/Icon.vue'
import { OptionList } from 'storybook/consts.js'

export default {
	component: Button,
	args: {
		default: 'Кнопка',
		disabled: false
	},
	argTypes: {
		//@ts-expect-error it doesn't pick up types for native events
		onClick: {},
		class: {
			control: 'select',
			options: [
				'',
				'accent',
				'minimal',
				'functional',
				'icon',
				'icon functional',
				'warning',
				'warning accent',
				'danger',
				'danger accent',
				'info',
				'info accent'
			]
		}
	}
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

export const accent: Story = {
	args: {
		class: 'accent'
	}
}

export const accentDisabled: Story = {
	args: {
		class: 'accent',
		disabled: true
	}
}

export const minimal: Story = {
	args: {
		class: 'minimal'
	}
}

export const minimalDisabled: Story = {
	args: {
		class: 'accent',
		disabled: true
	}
}

export const functional: Story = {
	args: {
		class: 'functional'
	}
}

export const functionalDisabled: Story = {
	args: {
		class: 'functional',
		disabled: true
	}
}

export const icon: Story = {
	render: (args) => ({
		components: { Button, Icon },
		setup: () => ({ args }),
		template: `
      <Button v-bind="args">
        <Icon name="inbox" />
      </Button>`
	}),
	args: {
		class: 'icon',
		default: undefined
	}
}
export const iconFunctional: Story = {
	...icon,
	args: {
		class: 'icon functional',
		default: undefined
	}
}
export const iconDisabled: Story = {
	...icon,
	args: {
		class: 'icon',
		disabled: true,
		default: undefined
	}
}
export const iconFunctionalDisabled: Story = {
	...icon,
	args: {
		class: 'icon functional',
		disabled: true,
		default: undefined
	}
}

export const warning: Story = {
	args: {
		class: 'warning'
	}
}

export const warningAccent: Story = {
	args: {
		class: 'warning accent'
	}
}

export const danger: Story = {
	args: {
		class: 'danger'
	}
}

export const dangerAccent: Story = {
	args: {
		class: 'danger accent'
	}
}

export const info: Story = {
	args: {
		class: 'info'
	}
}

export const infoAccent: Story = {
	args: {
		class: 'info accent'
	}
}

export const dropdown: Story = {
	args: {
		//@ts-expect-error it doesn't pick up types for native events
		onClick: undefined,
		default: undefined,
		dropdown: OptionList
	}
}
