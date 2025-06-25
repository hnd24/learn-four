'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {AllLevelIcon, EasyLevelIcon, HardLevelIcon, MediumLevelIcon} from '@/icon/difficuly-icon';
import {useFilter} from '../hook/use-filters';

export default function SelectLevel() {
	const {
		filter: {level},
		setFilter,
	} = useFilter();
	return (
		<Select defaultValue={level} onValueChange={value => setFilter({level: value})}>
			<SelectTrigger className="w-fit md:min-w-24 xl:md:min-w-64">
				<SelectValue placeholder="Level" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={'all'}>
					<AllLevelIcon /> All
				</SelectItem>
				<SelectItem value={'easy'}>
					<EasyLevelIcon /> Easy
				</SelectItem>
				<SelectItem value={'medium'}>
					<MediumLevelIcon /> Medium
				</SelectItem>
				<SelectItem value={'hard'}>
					<HardLevelIcon /> Hard
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
