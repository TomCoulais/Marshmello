import type { StorybookConfig } from "@storybook/react-vite";
import { StrictMode } from "react";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
		'@storybook/addon-controls',
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-backgrounds',
		'@storybook/addon-docs',
		'@storybook/addon-interactions',
		'@storybook/addon-measure',
		'@storybook/addon-outline',
		'@storybook/addon-themes',
		'@storybook/addon-toolbars',
		'@storybook/addon-viewport',
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
	core:{
		disableTelemetry: true,
	},
		async viteFinal(config, { configType }) {
			const { mergeConfig } = await import('vite');
			return mergeConfig(config, {
				server: {
					host: true,
					allowedHosts: ['ui.marshmello.aaa'],
				},
				port: 6006,
				strictPort: true,
				hmr:{
					protocol: 'wss',
					clientPort: 443,
					port: 6006,
				} 
			});	
}} satisfies StorybookConfig;
export default config;
