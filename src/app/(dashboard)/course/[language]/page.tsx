import ContentCourse from "@/feature/course/content/content-course";

export default function CourseLanguagePage({params}: {params: {language: string}}) {
	const language = params.language;
	return (
		<div className="w-full h-full flex flex-col items-center px-4 pt-8 ">
			<ContentCourse language={language} />
		</div>
	);
}
