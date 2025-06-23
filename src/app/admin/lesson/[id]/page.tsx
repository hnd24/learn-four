type Params = Promise<{id: string}>;

export default async function LessonPage({params}: {params: Params}) {
	const {id} = await params;
	return <div>LessonPage: {id}</div>;
}
