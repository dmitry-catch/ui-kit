import { Meta, StoryObj } from '@storybook/vue3'
import FileDeck from './FileDeck.vue'

export default {
	component: FileDeck,
	render: (args) => ({
		args: { files: [] },
		components: { FileDeck },
		setup: () => ({ args }),
		template: `
      <div>
        <span class="accent">Выберите файлы чтобы увидеть компонент!</span>
        <input type="file" :multiple="true" @change="(event)=>args.files = event.target.files" style="margin: 20px" />
        <FileDeck v-bind='args' v-model="args.files"/> 
      </div>
    `
	})
} satisfies Meta<typeof FileDeck>

type Story = StoryObj<typeof FileDeck>

export const Default: Story = {}
