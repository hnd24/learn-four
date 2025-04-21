import ContentHome from "@/feature/home/content/content-home";
import {CourseStoreProvider} from "@/providers/course-store-provider";

export default function HomePage() {
	return (
		<CourseStoreProvider>
			<div className="w-full h-full px-4 pt-8 ">
				<ContentHome />
			</div>
		</CourseStoreProvider>
	);
}
