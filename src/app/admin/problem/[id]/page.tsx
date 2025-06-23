type Params = Promise<{id: string}>;

export default async function ProblemDetailPage({params}: {params: Params}) {
	const {id} = await params;
	return <div>ProblemPage: {id}</div>;
}
