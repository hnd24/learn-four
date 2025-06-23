import SelectTypeProblem from '@/modules/admin/components/select-type-problem';
import {Suspense} from 'react';

export default function ProblemPage() {
	return (
		<div className="flex size-full">
			{/* sidebar */}
			<Suspense fallback={null}>
				<aside className="fixed inset-y-0 top-16 left-0 hidden w-64 lg:flex">
					<div className="size-full  border-r p-2 pt-2 dark:bg-[#121215]">
						<SelectTypeProblem />
					</div>
				</aside>
			</Suspense>
			<div className="mt-16 md:ml-64 flex justify-center size-full ">
				<span>Problem</span>
			</div>
		</div>
	);
}
