import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig((env) => {
	return {
		plugins: [vue(), dts({ rollupTypes: true })],
		server: { host: true },
		build: {
			emptyOutDir: true,
			target: ['es2020'],
			lib: {
				entry: resolve(__dirname, 'src/main.ts'),
				formats: ['es'],
				fileName: '[name]'
			},
			rollupOptions: {
				// make sure to externalize deps that shouldn't be bundled
				// into your library
				external: ['vue', '@forecsys/collections'],
				output: {
					preserveModules: false
				}
			}
		},
		test: {
			environment: 'happy-dom',
			globals: true
		}
	}
})
