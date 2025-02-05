import type { Uid } from '@/utils/types';

import { create } from 'zustand';

export interface AuthUser{
	uuid: Uid;
	username: string;
}

interface AuthState{
	user: AuthUser | undefined;
	actions: {
		login(user: AuthUser): void;
		logout(): void;
	};
}

const authStore = create<AuthState>((setState) => ({
	user: undefined,
	actions:{
		login:(user) => {
			setState({ user });
		},
		logout: () => {
			setState({ user: undefined });
		},
	},
}));

export function useAuthActions(){
	return authStore((state) => state.actions);
}

export function useAuthState(){
	return authStore((state) => state.user);
}

export function isAlreadyAuthenticated(){
	return authStore.getState().user !== undefined;
}

export async function hydrateAuthState(){
	const response = await fetch(import.meta.env.VITE_BASE_URL + '/auth/check', {
		method: 'GET',
		credentials: 'include',
});
	if (!response.ok) return;

	const user = (await response.json()) as AuthUser;
	authStore.getState().actions.login(user);
}
