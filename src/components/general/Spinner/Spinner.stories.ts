import { Meta, StoryObj } from '@storybook/vue3'
import Spinner from './Spinner.vue'

export default {
	component: Spinner,
	args: {
		center: false,
		inverse: false,
		backdrop: false,
		variant: 'light',
		size: 'medium',
		speed: 'normal',
		vertical: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['extra-small', 'small', 'medium', 'large', 'extra-large']
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
		size: 'extra-small'
	}
}
export const SmallSize: Story = {
	args: {
		size: 'small'
	}
}
export const LargeSize: Story = {
	args: {
		size: 'large'
	}
}
export const ExtraLargeSize: Story = {
	args: {
		size: 'extra-large'
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
		size: 'large'
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
		size: 'large',
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
