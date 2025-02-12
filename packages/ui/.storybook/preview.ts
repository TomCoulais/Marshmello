import type { Preview, ReactRenderer } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemeByDataAttribute } from "@storybook/addon-themes";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
			expanded: true,
			sort: 'alpha',
			disableSaveFromeUI: true,
    },
		viewport:{
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'desktop',
		}
  },
	decorators: [
		withThemeByDataAttribute<ReactRenderer>({
			themes:{
				light:'light',
				dark:'dark',
			},
			defaultTheme:'light',
			attributeName:'data-theme',
		}),
	],
	tags:['autodocs'],
};

export default preview;
