import ContentRoom from "@/feature/room/content/content-room";

export default async function DetailProblemPage({params}: {params: {id: string}}) {
	const {id} = await params;
	return (
		<div className="w-full px-1 py-4 sm:p-4">
			<ContentRoom id={id} />
		</div>
	);
}
