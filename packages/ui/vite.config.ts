import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "node:path";




// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
	server:{
		host: true,
		allowedHosts: ['ui.marshmello.aaa'],
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
		},
	},
})
