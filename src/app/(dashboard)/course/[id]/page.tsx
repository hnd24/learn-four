import CourseContent from '@/modules/dashboard/course/course-content';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {Id} from '../../../../../convex/_generated/dataModel';

type Params = Promise<{id: string}>;
export default async function PageCourse({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	return <CourseContent courseId={id as Id<'courses'>} />;
}
