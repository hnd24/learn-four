'use client';

import SearchLock from './search-lock';
import SearchName from './search-name';
import SearchRole from './search-role';
import UserTable from './user-table';

export default function ListUser() {
	return (
		<div className="w-full flex flex-col items-center gap-4">
			<div className="w-full flex flex-col  items-center gap-3">
				<SearchName />
				<div className="w-full flex gap-2">
					<SearchRole />
					<SearchLock />
				</div>
			</div>
			<UserTable />
		</div>
	);
}
