import { Meta, StoryObj } from '@storybook/vue3'
import Toggle from './Toggle.vue'
import Icon from '../../general/Icon/Icon.vue'

export default {
	component: Toggle,
	args: {
		modelValue: true,
		disabled: false,
		block: false
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
		block: true
	},
	render: (args) => ({
		components: { Toggle },
		setup() {
			return { args }
		},
		template: `
		<div :style="{ width: 85 + 'px'}">
		    <Toggle v-bind="args">
				<template #checked>
					Open
				</template>
				<template #unchecked>
					Close
				</template>
			</Toggle>
		</div>
	  `
	})
}

export const IconContent: Story = {
	render: (args) => ({
		components: { Toggle, Icon },
		setup() {
			return { args }
		},
		template: `
		<Toggle v-bind="args">
			<template #checked>
				<Icon name="check" />
			</template>
			<template #unchecked>
				<Icon name="close" />
			</template>
		</Toggle>
	  `
	})
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
		components: { Toggle, Icon },
		setup() {
			return { args }
		},
		template: `
		<Toggle v-bind="args" />
		<Toggle v-bind="args">
			<template #checked>
				<Icon name="check" />
			</template>
			<template #unchecked>
				<Icon name="close" />
			</template>
		</Toggle>
		<Toggle v-bind="args">
			<template #checked>
				{{ 1 }}
			</template>
			<template #unchecked>
				{{ 0 }}
			</template>
		</Toggle>
	  `
	})
}

export const ExtraSmall: Story = {
	args: {
		size: 'extra-small'
	},
	render: (args) => ({
		components: { Toggle, Icon },
		setup() {
			return { args }
		},
		template: `
		<Toggle v-bind="args" />
		<Toggle v-bind="args">
			<template #checked>
				<Icon name="check" />
			</template>
			<template #unchecked>
				<Icon name="close" />
			</template>
		</Toggle>
		<Toggle v-bind="args">
			<template #checked>
				{{ 1 }}
			</template>
			<template #unchecked>
				{{ 0 }}
			</template>
		</Toggle>
	  `
	})
}
