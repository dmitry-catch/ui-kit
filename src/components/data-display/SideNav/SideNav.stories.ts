import { Meta, StoryObj } from '@storybook/vue3'
import SideNav from './SideNav.vue'
import SideNavItem from './SideNavItem/SideNavItem.vue'
import MenuButton from './MenuButton/MenuButton.vue'
import { ref } from 'vue'
import Button from '../../general/Button/Button.vue'

export default {
	component: SideNav,
	args: {
		isCollapsed: false,
		header: 'Header',
		menu: 'Menu',
		default: '<span>Item 1</span> <span>Item 2</span>',
		footer: 'Footer'
	}
} satisfies Meta<typeof SideNav>

type Story = StoryObj<typeof SideNav>

export const Default: Story = {
	render: (args) => ({
		components: { SideNav, SideNavItem, MenuButton },
		setup: () => ({ args }),
		template: `<SideNav v-bind="args">
            <template #header>${args.header}</template>
            <template #menu>${args.menu}</template>
            ${args.default}
            <template #footer> ${args.footer} </template>
            </SideNav>`
	})
}

export const InteractiveItems: Story = {
	render: (args) => ({
		components: { SideNav, SideNavItem, MenuButton, Button },
		setup() {
			const toggleCollapse = () => {
				args.isCollapsed = !args.isCollapsed
			}
			const isItem1 = ref(false)
			const isItem2 = ref(false)
			const toggleItem1 = () => {
				isItem1.value = !isItem1.value
				isItem2.value = false
			}
			const toggleItem2 = () => {
				isItem2.value = !isItem2.value
				isItem1.value = false
			}
			return { args, toggleCollapse, isItem1, isItem2, toggleItem1, toggleItem2 }
		},
		template: `<SideNav v-bind="args">
            <template #header>Header</template>
            <template #menu><MenuButton :isCollapsed="args.isCollapsed" @click="toggleCollapse">Menu</MenuButton></template>
            <SideNavItem :active="isItem1" :isCollapsed="args.isCollapsed" icon="bar_chart" @click="toggleItem1">
				Item 1
			</SideNavItem>
            <SideNavItem :active="isItem2" :isCollapsed="args.isCollapsed" icon="category" @click="toggleItem2">
				Item 2
			</SideNavItem>
            <template #footer> Footer </template>
            </SideNav>`
	})
}

export const InteractiveSubitems: Story = {
	render: (args) => ({
		components: { SideNav, SideNavItem, MenuButton, Button },
		setup() {
			const toggleCollapse = () => {
				args.isCollapsed = !args.isCollapsed
			}

			const isRoute1 = ref(false)
			const isRoute2 = ref(false)
			const isRoute3 = ref(false)
			const isRoute4 = ref(false)
			return { args, toggleCollapse, isRoute1, isRoute2, isRoute3, isRoute4 }
		},
		template: `<SideNav v-bind="args">
            <template #header>Header</template>
            <template #menu><MenuButton :isCollapsed="args.isCollapsed" @click="toggleCollapse">Menu</MenuButton></template>
            <SideNavItem :active="isRoute1 || isRoute2" :isCollapsed="args.isCollapsed" icon="bar_chart">
				Item 1
				<template #subitems>
					<Button
						:class="{ minimal: isRoute1 }"
						class="functional text-medium secondary"
						@click=";[(isRoute1 = !isRoute1), ((isRoute2 = false), (isRoute3 = false), (isRoute4 = false))]"
						>Item 1.1</Button
					>
					<Button
						:class="{ minimal: isRoute2 }"
						class="functional text-medium secondary"
						@click=";[(isRoute2 = !isRoute2), ((isRoute1 = false), (isRoute3 = false), (isRoute4 = false))]"
						>Item 1.2</Button
					>
				</template>
			</SideNavItem>
            <SideNavItem :active="isRoute3 || isRoute4" :isCollapsed="args.isCollapsed" icon="category">
				Item 2
				<template #subitems>
					<Button
						:class="{ minimal: isRoute3 }"
						@click=";[(isRoute3 = !isRoute3), ((isRoute1 = false), (isRoute2 = false), (isRoute4 = false))]"
						class="functional text-medium secondary"
						>Item 2.1</Button
					>
					<Button
						:class="{ minimal: isRoute4 }"
						@click=";[(isRoute4 = !isRoute4), ((isRoute1 = false), (isRoute2 = false), (isRoute3 = false))]"
						class="functional text-medium secondary"
						>Item 2.2</Button
					>
				</template>
			</SideNavItem>
            <template #footer> Footer </template>
            </SideNav>`
	})
}
