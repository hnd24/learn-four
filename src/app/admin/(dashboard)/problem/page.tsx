import ListProblem from '@/modules/admin/components/list-problem';

export default function ProblemPage() {
	return (
		<div className=" lg:ml-64 flex items-center flex-col p-4 md:p-10">
			<section className="size-full">
				<ListProblem />
			</section>
		</div>
	);
}
