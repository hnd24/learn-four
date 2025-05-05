"use client";
import Carousel from "../carousel/carosuel";
import ListCourse from "../list-course/list-courses";

export default function ContentHome() {
	return (
		<div className="w-full h-full flex flex-col gap-10 md:gap-16">
			{/* <Button
				onClick={() => {
					changeCoursesState({coursesState: data, loading: !loading});
				}}>
				Change
			</Button> */}
			<Carousel />
			<ListCourse />
		</div>
	);
}
