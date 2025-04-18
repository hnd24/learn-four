import ContentHome from "@/feature/home/content/content-home";
import {CourseStoreProvider} from "@/providers/course-store-provider";

export default function HomePage() {
	return (
		<CourseStoreProvider>
			<ContentHome />
		</CourseStoreProvider>
	);
}
