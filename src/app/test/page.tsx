// src/components/pages/home-page.tsx
import {CounterStoreProvider} from "@/providers/counter-store-provider";
import ContentTestPage from "./components/content-test-page";

export default function page() {
	return (
		<CounterStoreProvider>
			<ContentTestPage />
		</CounterStoreProvider>
	);
}
