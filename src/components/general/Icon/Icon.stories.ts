import { Meta, StoryObj } from '@storybook/vue3'
import Icon from './Icon.vue'

export default {
	component: Icon,
	args: {
		name: 'inbox'
	}
} satisfies Meta<typeof Icon>

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

const IconNames: string[] = [
	'Crown',
	'access',
	'activity',
	'add',
	'add_circled',
	'alarm',
	'alert_circled',
	'anchor',
	'android',
	'apple',
	'archive',
	'arrow_backward',
	'arrow_down',
	'arrow_forward',
	'arrow_up',
	'arrow_up_down',
	'at_sign',
	'attachment',
	'badge',
	'bank',
	'bar_chart',
	'basket',
	'basketball',
	'battery',
	'battery_charging',
	'battery_full',
	'battery_half',
	'battery_low',
	'bluetooth',
	'bluetooth_off',
	'bold',
	'book',
	'bookmark',
	'box',
	'briefcase',
	'brush',
	'bug',
	'building',
	'bulb',
	'burger',
	'bus',
	'cake',
	'calculator',
	'calendar',
	'camera',
	'cart',
	'cast',
	'category',
	'center_align',
	'check',
	'check_all',
	'check_circled',
	'checkbox',
	'checkbox_unchecked',
	'chevron_backward',
	'chevron_double_backward',
	'chevron_double_down',
	'chevron_double_forward',
	'chevron_double_up',
	'chevron_down',
	'chevron_forward',
	'chevron_up',
	'chip',
	'chrome',
	'clipboard',
	'clock',
	'close',
	'close_circled',
	'cloud',
	'check',
	'cloud',
	'cloud_download',
	'cloud_off',
	'cloud_upload',
	'code',
	'coffee',
	'collapse',
	'color_palette',
	'command',
	'compass',
	'copy',
	'crop',
	'crosshairs',
	'cursor',
	'cycling',
	'dashboard',
	'database',
	'design',
	'diamond',
	'document',
	'dollar',
	'donut_chart',
	'download',
	'drag-drop',
	'drop',
	'dumbell',
	'edit',
	'euro',
	'event_add',
	'event_scheduled',
	'expand',
	'eye_dropper',
	'facebook',
	'fast_backward',
	'fast_forward',
	'figma',
	'file',
	'file_add',
	'files',
	'film',
	'filter',
	'fire',
	'flag',
	'flashlight',
	'flight',
	'folder',
	'folder_add',
	'frown',
	'fuel',
	'gamepad',
	'gift',
	'grid',
	'group',
	'growth',
	'hand cursor',
	'hash',
	'headphone',
	'heart',
	'help',
	'hide',
	'history',
	'home',
	'hot_news',
	'hourglass',
	'hybrid_view',
	'image',
	'inbox',
	'info',
	'instagram',
	'internet',
	'italics',
	'justify',
	'key',
	'keyboard',
	'keypad',
	'laptop',
	'laugh',
	'layers',
	'layout',
	'leaderboard',
	'left_align',
	'line_chart',
	'link',
	'linkedin',
	'list',
	'live',
	'loader',
	'location',
	'lock',
	'login',
	'logout',
	'mail',
	'mail_check',
	'map',
	'medal',
	'meh',
	'menu',
	'message',
	'messages',
	'mic',
	'mic_off',
	'mission',
	'mobile',
	'moon',
	'more_horizontal',
	'more_vertical',
	'mouse',
	'multiselect',
	'music',
	'new',
	'next',
	'note',
	'notes',
	'notification',
	'notification_off',
	'open',
	'paint_bucket',
	'paint_roller',
	'paragraph',
	'pause',
	'payment',
	'pen',
	'percent',
	'person',
	'phone',
	'phone_call_incoming',
	'phone_call_outgoing',
	'phone_call_rejected',
	'photo_camera',
	'photos',
	'pie_chart',
	'pin',
	'pinterest',
	'pizza',
	'play',
	'play_circled',
	'playlist',
	'power',
	'presentation',
	'previous',
	'printer',
	'privacy',
	'profile_circled',
	'promotion',
	'puzzle',
	'rain',
	'reaction',
	'receipt',
	'redo',
	'reload',
	'remove',
	'repeat',
	'right_align',
	'rocket',
	'ruler',
	'rupee',
	'sad',
	'safe',
	'save',
	'scan',
	'schedule',
	'scissors',
	'search',
	'second_menu',
	'send',
	'server',
	'settings',
	'share',
	'shield',
	'shield_check',
	'ship',
	'shopping_bag',
	'show',
	'shuffle',
	'size',
	'slack',
	'smart_watch',
	'smile',
	'snapchat',
	'snowflake',
	'sort',
	'sort_ascending',
	'sort_descending',
	'spotify',
	'spray',
	'star',
	'stop',
	'store',
	'strikethrough',
	'sun',
	'sync',
	'table_tennis',
	'tablet',
	'tag',
	'target',
	'thermometer',
	'thumbs_down',
	'thumbs_up',
	'ticket',
	'tile_view',
	'timer',
	'toggle_left',
	'toggle_right',
	'tool',
	'train',
	'trash',
	'trending_down',
	'trending_up',
	'trophy',
	'truck',
	'tune',
	'tv',
	'twitch',
	'twitter',
	'umbrella',
	'underline',
	'undo',
	'unlock',
	'update',
	'upload',
	'utensils',
	'vector',
	'video_off',
	'video_recorder',
	'volume',
	'volume_high',
	'volume_off',
	'wallet',
	'warning',
	'watch',
	'web_development',
	'wifi',
	'wifi_off',
	'wind',
	'window',
	'wine',
	'youtube',
	'zap',
	'zoom_in',
	'zoom_out',
	'menu-expand',
	'menu-collapse'
]

/**
 * Actual for 16/11/2023
 * Except typewriter-24px.png and mic-24px-1.svg
 */
export const AllIcons: Story = {
	render: (args) => ({
		components: { Icon },
		setup: () => ({ ...args, IconNames }),
		template: `
			<div v-bind:style="{ display: 'flex', flexWrap: 'wrap' }">
				<div
					v-bind:style="{ padding: '10px'}"
					v-for='name in IconNames'
					:title='name'
				>
					<Icon :name='name' />
				</div>
			</div>`
	})
}
