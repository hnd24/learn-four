import ListCourseCard from '@/modules/admin/components/list-course-card';

export default function AdminPage() {
	return (
		<div className=" lg:ml-64 flex items-center flex-col p-4 md:p-10">
			<section className="size-full">
				<ListCourseCard />
			</section>
		</div>
	);
}
