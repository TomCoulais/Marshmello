import { hydrateAuthState } from '@/stores/auth_store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import './index.css';

await hydrateAuthState();

const root = document.querySelector('#root');

if (root) {
	createRoot(document.querySelector('#root')!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
