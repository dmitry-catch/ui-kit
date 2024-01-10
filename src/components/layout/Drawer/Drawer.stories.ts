import { Meta, StoryObj } from '@storybook/vue3'
import Drawer from './Drawer.vue'
import { Button, Icon } from '../../../main'

export default {
	component: Drawer,
	args: { open: false, autofocus: false, backdrop: false, keyboard: false, placement: 'right', size: 'medium' },
	argTypes: {
		placement: {
			control: 'select',
			options: ['right', 'left', 'top', 'bottom']
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large', 'full']
		}
	},
	render: (args) => ({
		args: args,
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div>
        <Button @click="()=>args.open = !args.open">Click here to open the Drawer!</Button>
		<Drawer v-bind='args' @onClose='()=>args.open = !args.open'></Drawer>
      </div>
    `
	})
} satisfies Meta<typeof Drawer>

type Story = StoryObj<typeof Drawer>

export const Default: Story = {}

export const DefferentPlacements: Story = {
	render: (args) => ({
		args: {},
		components: { Drawer, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
        <Button @click="()=>{args.open = !args.open; args.placement = 'top'}"><Icon name="chevron_up"/></Button>
		<Button class='accent' @click="()=>{args.open = !args.open; args.placement = 'bottom'}"><Icon name="chevron_down"/></Button>
		<Button @click="()=>{args.open = !args.open; args.placement = 'right'}"><Icon name="chevron_forward"/></Button>
		<Button class='accent' @click="()=>{args.open = !args.open; args.placement = 'left'}"><Icon name="chevron_backward"/></Button>
        <Drawer v-bind='args' @onClose='()=>args.open = !args.open'></Drawer>
      </div>
    `
	})
}

export const DefferentSizes: Story = {
	render: (args) => ({
		args: {},
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
        <Button @click="()=>{args.open = !args.open; args.size = 'small'}">small</Button>
		<Button class='accent' @click="()=>{args.open = !args.open; args.size = 'medium'}">medium</Button>
		<Button @click="()=>{args.open = !args.open; args.size = 'large'}">large</Button>
		<Button class='accent' @click="()=>{args.open = !args.open; args.size = 'full'}">full</Button>
        <Drawer v-bind='args' @onClose='()=>args.open = !args.open'></Drawer>
      </div>
    `
	})
}

export const WithHeader: Story = {
	render: (args) => ({
		args: { header: 'Some header' },
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with header!</Button>
        <Drawer v-bind='args' @onClose='()=>args.open = !args.open'>
			<template #header v-slot>
				${args.header}
			</template>
		</Drawer>
      </div>
    `
	})
}
export const WithContent: Story = {
	render: (args) => ({
		args: {
			content: `			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae accusamus perspiciatis quae, nam ea molestiae dolorum repe</p>
			<p>llendus corporis, commodi, unde architecto ullam qui expedita esse assumenda. Explicabo ab sequi quae.</p>
				<Button >Some content</Button>`
		},
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with content!</Button>
        <Drawer v-bind='args' @onClose='()=>args.open = !args.open'>
			<template #default v-slot>
				${args.default}
			</template>
		</Drawer>
      </div>
    `
	})
}

export const WithControls: Story = {
	render: (args) => ({
		args: {
			controls: `<Button class="accent" @click="()=>args.open = !args.open">Some success action</Button>
				<Button @click="()=>args.open = !args.open">Some cancel action</Button>`
		},
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with controls!</Button>
        <Drawer v-bind='args' @onClose='()=>args.open = !args.open'>
			<template #controls v-slot>
				${args.controls}
			</template>
		</Drawer>
      </div>
    `
	})
}
