import { Meta, StoryObj } from '@storybook/vue3'
import Dialog from './Dialog.vue'
import DialogConfirm from './components/DialogConfirm.vue'
import DialogAlert from './components/DialogAlert.vue'
import { useDialogProvider } from '../../../utils/dialogContext.js'

export default {
	component: Dialog,
	args: {},
	argTypes: {},
	render: (args) => ({
		components: { Dialog, DialogConfirm, DialogAlert },
		setup() {
			useDialogProvider()
			return { args }
		},
		template: `
      <div style='display: flex; gap: 10px;'>
		<span> Click the </span>
 		<u><DialogAlert header="Alert!" content="Alert message, please click close button" closeBtnText="Close"></DialogAlert></u>
		 <span> or </span>
  		<u><DialogConfirm header="Confirm!" content="Confirm message, please click submit button" submitBtnText="Submit" cancelBtnText="Cancel"></DialogConfirm></u> 
		<span>to open the dialog</span>
        <Dialog></Dialog>
      </div>
    `
	})
} satisfies Meta<typeof Dialog>

type Story = StoryObj<typeof Dialog>
/** Контекст компонента <b>Dialog</b> используется в сторе <b>useDialogProvider</b>. <br />
 * Инициализируется на верхнем уровне, затем в дочерних компонентах используются утилиты <b>useConfirm</b> и <b>useAlert</b> для вызова диалогового окна. <br />
 * Для того чтобы напрямую взаимодействовать с контекстом, используется <b>inject(dialogContext)</b>. */
export const Default: Story = {}
