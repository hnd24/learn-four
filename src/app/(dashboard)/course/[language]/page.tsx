import ReturnHomeBlock from "@/components/return-home-block";
import {ListLanguagePage} from "@/constants";
import ContentCourse from "@/feature/course/content/content-course";

export default async function CourseLanguagePage({params}: {params: {language: string}}) {
	const {language} = await params;
	const isNotFound = Object.values(ListLanguagePage).includes(language);

	if (!isNotFound) {
		return <ReturnHomeBlock />;
	}

	return (
		<div className="w-full px-2 sm:px-4 pt-8">
			<ContentCourse language={language} />
		</div>
	);
}
