import { Meta, StoryObj } from '@storybook/vue3'
import Uploader from './Uploader.vue'
import { Button, Icon } from '../../../main'

export default {
	component: Uploader,
	args: {
		modelValue: [],
		draggable: false,
		invalid: false,
		disabled: false,
		multiple: false,
		loading: false,
		length: undefined
	},
	argTypes: {}
} satisfies Meta<typeof Uploader>

type Story = StoryObj<typeof Uploader>

export const Default: Story = {}

export const Draggable: Story = {
	args: {
		draggable: true
	}
}

export const FilledSlot: Story = {
	render: (args) => ({
		components: { Uploader, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			<template v-slot:actionButton='actionButtonProps'>
				<Icon name='upload'></Icon>
			</template>
		</Uploader>
      </div>
    `
	})
}

export const DraggableWithFilledSlot: Story = {
	args: {
		draggable: true
	},
	render: (args) => ({
		components: { Uploader, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			<template v-slot:actionButton='actionButtonProps'>
				<Icon name='upload'></Icon>
			</template>
		</Uploader>
      </div>
    `
	})
}

export const HintSlot: Story = {
	args: { draggable: true },
	render: (args) => ({
		components: { Uploader, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			<template #hint>
				Прикрепите файлы форматов doc, docx, zip, xls, xlsx, pdf
			</template>
		</Uploader>
      </div>
    `
	})
}

export const ErrorSlot: Story = {
	args: { draggable: true },
	render: (args) => ({
		components: { Uploader, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			<template #error>
				some error message
			</template>
		</Uploader>
      </div>
    `
	})
}
