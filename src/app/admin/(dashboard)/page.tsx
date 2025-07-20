import ListCourseCard from '@/modules/admin/components/list-course-card';
import StatusDropdown from '@/modules/admin/components/status-dropdown';

export default function AdminPage() {
	return (
		<div className=" lg:ml-64 flex  flex-col p-4 md:p-10">
			<div className="flex justify-items-start lg:hidden mb-4">
				<StatusDropdown />
			</div>
			<section className="size-full">
				<ListCourseCard />
			</section>
		</div>
	);
}
