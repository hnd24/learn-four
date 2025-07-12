'use client';
import {STATUS_PROBLEM_ITEMS} from '../../constants';
import {useFilter} from '../../hook/use-filters';
import {SidebarItem} from '../sidebar-item';

export default function SelectTypeProblem() {
	const {
		filter: {status},
		setFilter,
	} = useFilter();
	return (
		<section className="flex-col">
			<p className="px-2 py-1.5 text-base font-semibold data-[inset]:pl-8">Status</p>
			<div className="space-y-1">
				{Object.entries(STATUS_PROBLEM_ITEMS).map(([key, value]) => (
					<SidebarItem
						key={key}
						title={value.label}
						icon={value.icon}
						isActive={status === key}
						onClick={() =>
							setFilter({
								status: key,
							})
						}
					/>
				))}
			</div>
		</section>
	);
}
