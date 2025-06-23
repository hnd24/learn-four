'use client';

import {STATUS_COURSE_ITEMS} from '../constants';
import {useStatusFilter} from '../hook/use-filters';
import {SidebarItem} from './sidebar-item';

export default function SelectTypeCourse() {
	const {
		status: {type},
		setStatus,
	} = useStatusFilter();
	return (
		<section className="flex-col">
			<p className="px-2 py-1.5 text-base font-semibold data-[inset]:pl-8">Status</p>
			<div className="space-y-1">
				{Object.entries(STATUS_COURSE_ITEMS).map(([key, value]) => (
					<SidebarItem
						key={key}
						title={value.label}
						icon={value.icon}
						isActive={type === key}
						onClick={() =>
							setStatus({
								type: key,
							})
						}
					/>
				))}
			</div>
		</section>
	);
}
