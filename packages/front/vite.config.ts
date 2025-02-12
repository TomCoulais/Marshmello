import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite({
		virtualRouteConfig:'./src/routes.ts',
	}), react(), tailwindcss(),],
	server: {
		host: true,
		allowedHosts: [
			'marshmello.aaa',
		],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});


