import { Meta, StoryObj } from '@storybook/vue3'
import Drawer from './Drawer.vue'
import { Button, Icon, Select, InputNumber, TextField } from '../../../main'

export default {
	component: Drawer,
	args: {
		open: false,
		autofocus: false,
		backdrop: false,
		relative: false,
		keyboard: true,
		placement: 'right',
		size: 'medium',
		header: '',
		default: '',
		footer: ''
	},
	argTypes: {
		placement: {
			control: 'select',
			options: ['right', 'left', 'top', 'bottom']
		},
		backdrop: {
			control: 'select',
			options: [true, false, 'static']
		}
	},
	render: (args) => ({
		args: args,
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
		<div>
			<Button @click="()=>args.open = true">Click here to open the Drawer!</Button>
			<Drawer v-bind='args' @close='()=>args.open = false'>
				<template #header v-slot>${args.header}</template>
				<template #default v-slot>${args.default}</template>
				<template #footer v-slot>${args.footer}</template>
			</Drawer>
		</div>
    	`
	})
} satisfies Meta<typeof Drawer>

type Story = StoryObj<typeof Drawer>

export const Default: Story = {}

export const DifferentPlacements = {
	render: (args) => ({
		args: {},
		components: { Drawer, Button, Icon },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}" >
        <Button @click="()=>{args.open = !args.open; args.placement = 'top'}"><Icon name="chevron_up"/></Button>
		<Button class='accent' @click="()=>{args.open = !args.open; args.placement = 'bottom'}"><Icon name="chevron_down"/></Button>
		<Button @click="()=>{args.open = !args.open; args.placement = 'right'}"><Icon name="chevron_forward"/></Button>
		<Button class='accent' @click="()=>{args.open = !args.open; args.placement = 'left'}"><Icon name="chevron_backward"/></Button>
        <Drawer v-bind='args' @close='()=>args.open = !args.open'></Drawer>
      </div>
    `
	})
} satisfies Story

export const DefferentSizes = {
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
        <Drawer v-bind='args' @close='()=>args.open = false'></Drawer>
      </div>
    `
	})
} satisfies Story

export const WithHeader = {
	args: { header: 'Some header' },
	render: (args) => ({
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with header!</Button>
        <Drawer v-bind='args'  @close='()=>args.open = false'>
			<template #header v-slot>
				<div v-if="args.header">${args.header}</div>
				<div v-else>Some header</div>
			</template>
		</Drawer>
      </div>
    `
	})
} satisfies Story

export const WithContent = {
	args: { default: 'Some content' },
	render: (args) => ({
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with content!</Button>
        <Drawer v-bind='args' @close='()=>args.open = false'>
			<template #default v-slot>
				<div v-if="args.default">${args.default}</div>
				<p v-if="!args.default">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae accusamus perspiciatis quae, nam ea molestiae dolorum repe</p>
				<p v-if="!args.default">llendus corporis, commodi, unde architecto ullam qui expedita esse assumenda. Explicabo ab sequi quae.</p>
				<Button v-if="!args.default">Some content</Button>
			</template>
		</Drawer>
      </div>
    `
	})
} satisfies Story

export const WithFooter = {
	args: { footer: 'Some footer' },
	render: (args) => ({
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with controls!</Button>
        <Drawer v-bind='args' @close='()=>args.open = false'>
			<template #footer v-slot>
				<div v-if="args.footer">${args.footer}</div>
				<Button v-if="!args.footer" class="accent" @click="()=>args.open = !args.open">Some success action</Button>
				<Button v-if="!args.footer" @click="(e)=>{args.open = false}">Some cancel action</Button>
			</template>
		</Drawer>
      </div>
    `
	})
} satisfies Story

export const WithPopupElements = {
	args: { backdrop: true, size: 'large', selectedValue: 1 },
	render: (args) => ({
		components: { Drawer, Button, Select, InputNumber, TextField },
		setup: () => ({ args }),
		template: `
      <div :style="{display: 'flex', gap: 'var(--design-gap-unit)'}">
	   <Button @click="()=>args.open = !args.open">Click here to open the Drawer with header!</Button>
        <Drawer v-bind='args'  @close='()=>args.open = false'>
			<TextField label="Text field"/>
			<label>Input number</label>
			<InputNumber/>
			<Select label="Select" v-model="args.selectedValue" :options="[{name: 'option1', value:'1'},{name: 'option2', value:'2'},{name: 'option3', value:'3'}]"/>
			
		</Drawer>
      </div>
    `
	})
} satisfies Story

export const Relative = {
	args: { backdrop: true, size: 'large', relative: true },
	render: (args) => ({
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{width: '400px', height: '400px', border: '1px solid var(--design-border-color-baseline)', position: 'absolute'}">
        <Drawer v-bind='args'  @close='()=>args.open = false'/>
		 <Button @click="()=>args.open = !args.open">Click here to open relative Drawer!</Button>
      </div>
    `
	})
} satisfies Story
