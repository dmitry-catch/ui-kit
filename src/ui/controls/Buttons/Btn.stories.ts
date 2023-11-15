import { Meta, StoryObj } from '@storybook/vue3'
import Btn from './Btn.vue'
import Icon from '../../icons/Icon.vue'

export default {
	title: 'Base/Button',
	component: Btn,
	args: {
		default: 'Кнопка',
		onClick: () => alert('Click'),
		disabled: false
	},
	argTypes: {
		class: {
			control: 'select',
			options: ['', 'accent', 'minimal', 'functional', 'icon', 'icon functional', 'warning', 'warning accent', 'danger', 'danger accent', 'info', 'info accent']
		},
	}
} satisfies Meta<typeof Btn>

type Story = StoryObj<typeof Btn>;

export const Base: Story = {}

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
		components: { Btn, Icon },
		setup() {
			return { args }
		},
		template: '<Btn v-bind="args"><Icon name="inbox" /></Btn>'
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
		onClick: undefined,
		default: undefined,
		dropdown: [
			{
				name: 'Option 1',
				value: 1,
				action(e: any) {
					alert(`Clicked by ${e.data.name}`)
				}
			},
			{
				name: 'Option 2',
				value: 2,
				action(e: any) {
					alert(`Clicked by ${e.data.name}`)
				}
			},
			{
				name: 'Option 3',
				value: 3,
				action(e: any) {
					alert(`Clicked by ${e.data.name}`)
				}
			}
		]
	}
}
