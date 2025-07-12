import {Skeleton} from '@/components/ui/skeleton';

type Props = {
	number?: number;
};

export default function SkeletonListProblem({number = 5}: Props) {
	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<div className="flex flex-col md:flex-row gap-2">
				<Skeleton className="w-full lg:w-64 h-8" />
				<div className="flex gap-2">
					<Skeleton className="h-8 w-full md:min-w-40 xl:md:min-w-64" />
					<Skeleton className="h-8 w-20 md:min-w-24 xl:md:min-w-64" />
				</div>
			</div>

			<div className="mx-auto w-full flex flex-col gap-4">
				<Skeleton className="h-8 w-full rounded-md" />
				<SkeletonTable number={number} />
			</div>
			<div className="w-full gird place-items-center">
				<Skeleton className="h-10 w-32" />
			</div>
		</div>
	);
}

function SkeletonTable({number = 5}: Props) {
	const randomWidth = [
		55.7343026667923, 44.435357063436584, 49.529229787939286, 44.209650390761304,
		72.39327212955446, 26.062235927734626, 44.61867398432197, 38.38129457261948,
		29.07932763509362, 59.14535864721991, 52.27163814110361, 24.300076279559676,
		71.26114312669775, 44.39327212955446, 60.504783051090676, 36.70947203994367,
		33.824239858932366, 51.36349179915079, 67.31670878876955,
	];
	return (
		<div className="w-full flex flex-col gap-2">
			<Skeleton className="h-8 ml-12 w-20" />
			{Array.from({length: number}).map((_, index) => {
				return <SkeletonTableRow key={index} width={randomWidth[index]} />;
			})}
		</div>
	);
}

function SkeletonTableRow({width = 100}: {width: number}) {
	return (
		<div className="flex items-center gap-2">
			<Skeleton className="h-8 w-12" />
			<Skeleton
				className="h-8"
				style={{
					width: `${width}%`,
				}}
			/>
		</div>
	);
}
