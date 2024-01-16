import { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem/DropdownItem.vue'
import Icon from '../../general/Icon/Icon.vue'

export default {
	component: Dropdown,
	args: {
		title: 'Dropdown',
		disabled: false,
		chevroned: true,
		preIcon: 'internet'
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['extra-small', 'small', 'medium']
		}
	},
    render: (args) => ({
		components: { Dropdown, DropdownItem, Icon },
		setup: () => ({ args }),
		template: `
			<Dropdown v-bind="args">
				<DropdownItem >
					<div>1 Item</div>
				</DropdownItem>
				<DropdownItem disabled>
					<div>2 Item</div>
				</DropdownItem>
				<DropdownItem >
					<Icon name="edit" />
					<div>3 Item</div>
				</DropdownItem>
				<DropdownItem divider />
                <DropdownItem >
					<div>4 Item</div>
				</DropdownItem>
			</Dropdown>
		`
	})

} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}
