import { isAlreadyAuthenticated, useAuthActions } from "@/stores/auth_store";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected_layout")({
	beforeLoad: () => {
		if(!isAlreadyAuthenticated()){
			// eslint-disable-next-line @typescript-eslint/only-throw-error
			throw redirect({ to: '/auth/login'})
		}
	},
	component: ProtectedLayout,
});

function ProtectedLayout(){
	const navigate = useNavigate();
	const { logout } = useAuthActions();
	const logoutMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch(import.meta.env.VITE_BASE_URL + '/auth/logout',{
				method: 'POST',
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			});
			if(!response.ok) return;
			logout();
			void navigate({ to: '/auth/login' });
		}
	});

	function handleLogout(){
		logoutMutation.mutate();
	};

	return (<>
	<header>
		<button type="button" onClick={handleLogout}>Déconnexion</button>
	</header>
		<Outlet />
	</>);
}