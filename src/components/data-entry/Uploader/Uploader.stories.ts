import { Meta, StoryObj } from '@storybook/vue3'
import Uploader from './Uploader.vue'
import { Button, Icon } from '../../../main'
export default {
	component: Uploader,
	args: {
		modelValue: [],
		draggable: true,
		invalid: false,
		disabled: false,
		multiple: true,
		loading: false,
		length: 3
	},
	argTypes: {},
	render: (args) => ({
		components: { Uploader, Button },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			{{slotcontent}}
		</Uploader>
      </div>
    `
	})
} satisfies Meta<typeof Uploader>

type Story = StoryObj<typeof Uploader>

export const Default: Story = {}

export const FilledSlot: Story = {
	render: (args) => ({
		components: { Uploader, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			<template v-slot:actionButton='actionButtonProps'>
				<Button class='icon' v-bind='actionButtonProps'><Icon name='upload'></Icon></Button>
			</template>
		</Uploader>
      </div>
    `
	})
}

export const NotDraggable: Story = {
	args: {
		draggable: false
	}
}

export const NotDraggableWithActionButtonSlot: Story = {
	args: {
		draggable: false
	},
	render: (args) => ({
		components: { Uploader, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'>
			<template v-slot:actionButton='actionButtonProps'>
				<Button class='icon' v-bind='actionButtonProps'><Icon name='upload'></Icon></Button>
			</template>
		</Uploader>
      </div>
    `
	})
}

export const HintSlot: Story = {
	args: {},
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
	args: {},
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
