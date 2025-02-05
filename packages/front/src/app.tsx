import { queryClient } from "@/libs/query_client";
import { router } from "@/libs/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { Suspense } from "react";

export function App() {
	console.info('render <App/>');
	return (
		<Suspense fallback={<p>Chargement...</p>}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Suspense>
	)
}
