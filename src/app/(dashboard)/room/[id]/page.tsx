import ContentRoom from "@/feature/room/content/content-room";
import {DashboardProvider} from "@/feature/room/provider";

export default async function DetailProblemPage({params}: {params: {id: string}}) {
	const {id} = await params;
	return (
		<div className="w-full pt-4 ">
			<ContentRoom id={id} />
		</div>
	);
}
