import ModuleRoom from "@/modules/lesson";

export default async function DetailProblemPage({params}: {params: {id: string}}) {
	const {id} = await params;
	return (
		<div className="w-full pt-4 ">
			<ModuleRoom id={id} />
		</div>
	);
}
