import { Meta, StoryObj } from '@storybook/vue3'
import Spinner from './Spinner.vue'

export default {
	component: Spinner,
	args: {
		center: false,
		inverse: false,
		backdrop: false,
		variant: 'light',
		size: 'md',
		speed: 'normal',
		vertical: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'xs', 'lg', 'xl']
		},
		speed: {
			control: 'select',
			options: ['slow', 'normal', 'fast']
		},
		variant: {
			control: 'select',
			options: ['light', 'dark']
		}
	}
} satisfies Meta<typeof Spinner>

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}
export const Inverse: Story = {
	args: {
		inverse: true
	}
}

export const Dark: Story = {
	args: {
		variant: 'dark'
	}
}
export const DarkInverse: Story = {
	args: {
		variant: 'dark',
		inverse: true
	}
}
export const Center: Story = {
	args: {
		center: true
	},
	render: (args) => ({
		args: {},
		components: { Spinner },
		setup: () => ({ args }),
		template: `
      <div style="background: var(--design-background-color-primary); width: 450px; height: 200px; position: relative">
        <Spinner v-bind='args'>
			<template #default>
				Loading...
			</template>
		</Spinner> 
      </div>
    `
	})
}
export const Backdrop: Story = {
	args: {
		center: true,
		backdrop: true
	},
	render: (args) => ({
		args: {},
		components: { Spinner },
		setup: () => ({ args }),
		template: `
      <div style="background: var(--design-background-color-primary); width: 450px; height: 200px; position: relative">
        <Spinner v-bind='args'>
			<template #default>
				Loading...
			</template>
		</Spinner> 
      </div>
    `
	})
}
export const ExtraSmallSize: Story = {
	args: {
		size: 'xs'
	}
}
export const SmallSize: Story = {
	args: {
		size: 'sm'
	}
}
export const LargeSize: Story = {
	args: {
		size: 'lg'
	}
}
export const ExtraLargeSize: Story = {
	args: {
		size: 'xl'
	}
}
export const SlowSpeed: Story = {
	args: {
		speed: 'slow'
	}
}
export const FastSpeed: Story = {
	args: {
		speed: 'fast'
	}
}
export const CustomDescription: Story = {
	args: {
		size: 'lg'
	},
	render: (args) => ({
		args: {},
		components: { Spinner },
		setup: () => ({ args }),
		template: `
      <div>
        <Spinner v-bind='args'>
			<template #default>
				Loading...
			</template>
		</Spinner> 
      </div>
    `
	})
}
export const CustomDescriptionVertically: Story = {
	args: {
		size: 'lg',
		vertical: true
	},
	render: (args) => ({
		args: {},
		components: { Spinner },
		setup: () => ({ args }),
		template: `
      <div>
        <Spinner v-bind='args'>
			<template #default>
				Loading...
			</template>
		</Spinner> 
      </div>
    `
	})
}
