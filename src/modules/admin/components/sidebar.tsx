import SelectTypeCourse from './select-type-course';

type Props = {
	type: 'course' | 'problem';
};

export default function Sidebar({type = 'course'}: Props) {
	return (
		<aside className="fixed inset-y-0 top-16 left-0 hidden w-64 lg:flex">
			<div className="size-full  border-r p-2 pt-2 dark:bg-[#121215]">
				{type === 'course' ? <SelectTypeCourse /> : <></>}
			</div>
		</aside>
	);
}
