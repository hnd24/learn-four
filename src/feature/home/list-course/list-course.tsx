import ItemCourse from "./components/item-course";
const data = [
	{
		banner: "/images/banner-javascript.png",
		language: "Javascript",
		authorImage: "https://github.com/shadcn.png",
		authorName: "Nhựt Duy",
		star: 4.6,
		lessons: 10,
	},
	{
		banner: "/images/banner-java.png",
		language: "Java",
		authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
		authorName: "Minh Tuấn",
		star: 4.8,
		lessons: 12,
	},
	{
		banner: "/images/banner-python.png",
		language: "Python",
		authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
		authorName: "Thanh Hằng",
		star: 4.7,
		lessons: 15,
	},
	{
		banner: "/images/banner-cpp.png",
		language: "C++",
		authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
		authorName: "Quốc Anh",
		star: 4.5,
		lessons: 11,
	},
	{
		banner: "/images/banner-csharp.png",
		language: "C#",
		authorImage: "https://randomuser.me/api/portraits/women/46.jpg",
		authorName: "Bích Ngọc",
		star: 4.6,
		lessons: 13,
	},
];

export default function ListCourse() {
	return (
		<div className="h-full w-full border border-gray-100 p-4 md:p-8 gap-4 rounded-lg bg-white shadow-xl flex flex-col">
			<span className="w-full text-3xl font-bold">List Course :</span>
			<div className="h-full w-full  grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 *: gap-6">
				{data.map((item, index) => (
					<ItemCourse
						key={index}
						banner={item.banner}
						language={item.language}
						authorImage={item.authorImage}
						authorName={item.authorName}
						star={item.star}
						lessons={item.lessons}
					/>
				))}
			</div>
		</div>
	);
}
