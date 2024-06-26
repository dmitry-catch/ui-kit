import { Meta, StoryObj } from '@storybook/vue3'
import VersionPopup from './VersionPopup.vue'

export default {
	component: VersionPopup,
	args: {
		serviceName: 'Название сервиса',
		version: '0.0.1',
		uiKitVersion: '0.0.0.2'
	},
	render: (args) => ({
		components: { VersionPopup },
		setup: () => ({ args }),
		template: `<div :style="{width: '400px', height: '800px',  display: 'flex',
	   flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }">
            <VersionPopup v-bind="args"/>
        </div>`
	})
} satisfies Meta<typeof VersionPopup>

type Story = StoryObj<typeof VersionPopup>

export const Default: Story = {}
