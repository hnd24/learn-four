import ReturnHomeBlock from "@/components/return-home-block";

import ContentCourse from "@/feature/course/content/content-course";
import {LanguageProgrammingEnum} from "@/types";

export default async function CourseLanguagePage({params}: {params: {language: string}}) {
	const {language} = await params;
	const isNotFound = Object.values(LanguageProgrammingEnum).includes(
		language as LanguageProgrammingEnum,
	);

	if (!isNotFound) {
		return <ReturnHomeBlock />;
	}

	return (
		<div className="w-full px-2 sm:px-4 pt-8">
			<ContentCourse language={language} />
		</div>
	);
}
