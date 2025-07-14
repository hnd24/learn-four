type Params = Promise<{id: string}>;
export default async function ProblemRoomPage({params}: {params: Params}) {
	const {id} = await params;
	return <div>ProblemRoomPage : {id}</div>;
}
