import ListProblem from '@/modules/admin/components/list-problem';
import StatusDropdown from '@/modules/admin/components/status-dropdown';

export default function ProblemPage() {
	return (
		<div className=" lg:ml-64 flex items-center flex-col p-4 md:p-10">
			<div className="flex justify-items-start lg:hidden mb-4">
				<StatusDropdown />
			</div>
			<section className="size-full">
				<ListProblem />
			</section>
		</div>
	);
}
