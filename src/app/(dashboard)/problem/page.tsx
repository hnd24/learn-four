import Header from '@/modules/dashboard/components/header';
import ProblemContent from '@/modules/dashboard/problem/problem-table';
import SearchName from '@/modules/dashboard/problem/query-problem/search-name';
import SelectLevel from '@/modules/dashboard/problem/query-problem/select-level';
import SelectTopic from '@/modules/dashboard/problem/query-problem/select-topic';

export default function PageProblem() {
	return (
		<div className="flex flex-col items-center bg-muted">
			<Header />
			<main className="bg-background w-full md:max-w-4xl lg:max-w-6xl  min-h-[calc(100vh-64px)] py-6 sm:py-12 px-6  space-y-6">
				<section className="flex flex-col justify-center items-center px-4 ">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
						<h2 className="font-heading text-lg  sm:text-2xl leading-[1.1] font-bold md:text-3xl">
							Your Problem - Solving Skills <br />✨ Coding Challenges 🎖️
						</h2>
					</div>
				</section>
				<div className="w-full flex flex-col items-center md:flex-row gap-2">
					<SearchName />
					<div className="w-full flex gap-2">
						<SelectTopic />
						<SelectLevel />
					</div>
				</div>
				<ProblemContent />
			</main>
		</div>
	);
}
