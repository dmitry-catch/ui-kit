import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
export default defineConfig({
	plugins: [vue({}), dts({ exclude: ['dist', 'node_modules'] })],
	assetsInclude: [],
	server: {},
	build: {
		target: ['es2020'],
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			formats: ['es'],
			fileName: '[name]',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['vue'],
			output: {
				preserveModules: true,
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
})
