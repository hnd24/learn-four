import CostumeLoadingPage from '@/page/costume-loading-page';

type Params = Promise<{id: string}>;

export default async function LessonPage({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	return <div>LessonPage: {id}</div>;
}
