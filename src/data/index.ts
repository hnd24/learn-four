import {
	CourseDetailStateType,
	CourseStateType,
	LessonDetailType,
	ProblemStateType,
	StatusPlace,
	UserStateType,
} from "@/types";

export const courseData: CourseStateType[] = [
	{
		_id: "123",
		background: "from-[#c49d0a] to-[#f7ef4d]",
		language: "JavaScript",
		extension: "js",
		description:
			"JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced.",
		logoLanguage: "/icon/javascript-icon.svg",
		banner: "/images/banner-Javascript.png",
		authorId: "123456",
		authorImage: "https://github.com/shadcn.png",
		authorName: "Nhựt Duy",
		star: 4.1,
		learner: 200,
		status: "approved" as StatusPlace,
		lessons: 15,
	},
	{
		_id: "456",
		background: "from-[#dd5902] to-[#ffbd4d]",
		language: "Java",
		extension: "java",
		description:
			"Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
		logoLanguage: "/icon/java-icon.svg",
		banner: "/images/banner-java.png",
		authorId: "789012",
		authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
		authorName: "Minh Tuấn",
		star: 4.8,
		learner: 300,
		status: "approved" as StatusPlace,
		lessons: 12,
	},
	{
		_id: "789",
		background: "from-[#2371b1] to-[#91c2e8]",
		language: "Python",
		extension: "py",
		description:
			"Python is a programming language that lets you work quickly and integrate systems more effectively. Python is powerful... and fast; plays well with others; and runs everywhere.",
		logoLanguage: "/icon/python-icon.svg",
		banner: "/images/banner-python.png",
		authorId: "345678",
		authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
		authorName: "Thanh Hằng",
		star: 4.9,
		learner: 250,
		status: "approved" as StatusPlace,
		lessons: 15,
	},
	{
		_id: "101112",
		background: "from-[#004482] to-[#83d9ff]",
		language: "C++",
		extension: "cpp",
		description:
			"C++ is a general-purpose programming language created by Bjarne Stroustrup. It has imperative, object-oriented and generic programming features, while also providing facilities for low-level memory manipulation.",
		logoLanguage: "/icon/cpp-icon.svg",
		banner: "/images/banner-cpp.png",
		authorId: "901234",
		authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
		authorName: "Quốc Anh",
		star: 4.3,
		learner: 180,
		status: "approved" as StatusPlace,
		lessons: 11,
	},
	{
		_id: "131415",
		background: "from-[#662579] to-[#e0b5f2]",
		language: "C#",
		extension: "cs",
		description:
			"C# is a modern, object-oriented programming language developed by Microsoft. It is designed for building a variety of applications that run on the .NET Framework.",
		logoLanguage: "/icon/csharp-icon.svg",
		banner: "/images/banner-csharp.png",
		authorId: "161718",
		authorImage: "https://randomuser.me/api/portraits/women/46.jpg",
		authorName: "Bích Ngọc",
		star: 4.6,
		learner: 220,
		status: "approved" as StatusPlace,
		lessons: 13,
	},
];

export const defaultBanner = [
	{
		_id: "default",
		background: "from-[#484ce3] to-[#a6bcfb]",
		language: "Learn Four",
		description:
			"This place helps you learn programming Language. As well as challenge each other with coding problems to improve your skills together",
		logoLanguage: "/images/programer.svg",
	},
];

export const problemData: ProblemStateType[] = [
	{
		_id: "1234",
		level: "Easy",
		name: "Sum of Two Numbers",
		topic: "Array",
		star: 4.5,
	},
	{
		_id: "1234",
		level: "Medium",
		name: "Two Sum",
		topic: "Array",
		star: 5,
	},
	{
		_id: "1234",
		level: "Hard",
		name: "Longest Substring Without Repeating Characters",
		topic: "String",
		star: 3,
	},
	{
		_id: "1234",
		level: "Easy",
		name: "Valid Parentheses",
		topic: "String",
		star: 3.5,
	},
	{
		_id: "1234",
		level: "Medium",
		name: "3Sum",
		topic: "Array",
		star: 4,
	},
	{
		_id: "1234",
		level: "Hard",
		name: "Median of Two Sorted Arrays",
		topic: "Array",
		star: 5,
	},
	{
		_id: "1234",
		level: "Easy",
		name: "Reverse Integer",
		topic: "Math",
		star: 2.5,
	},
	{
		_id: "1234",
		level: "Medium",
		name: "Longest Palindromic Substring",
		topic: "String",
		star: 4.5,
	},
	{
		_id: "1234",
		level: "Hard",
		name: "Container With Most Water",
		topic: "Array",
		star: 3.5,
	},
	{
		_id: "1234",
		level: "Easy",
		name: "Roman to Integer",
		topic: "Math",
		star: 2,
	},
];

export const userData: UserStateType = {
	userId: "123",
	name: "Anonymous",
	email: "xyz@gmail.com",
	image: "https://github.com/shadcn.png",
};

export const CourseDetailData: CourseDetailStateType = {
	_id: "123",
	background: "from-[#c49d0a] to-[#f7ef4d]",
	language: "JavaScript",
	description:
		"JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced.",
	logoLanguage: "/icon/JavaScript-icon.svg",
	banner: "/images/banner-JavaScript.png",
	authorId: "123456",
	authorImage: "https://github.com/shadcn.png",
	authorName: "Nhựt Duy",
	star: 4.1,
	learner: 200,
	status: "approved" as StatusPlace,
	lessons: [
		{
			_id: "lesson1",
			topic: "Introduction to JavaScript",
			stars: 4.5,
			level: "Easy",
		},
		{
			_id: "lesson2",
			topic: "JavaScript Variables and Data Types",
			stars: 5,
			level: "Medium",
		},
		{
			_id: "lesson3",
			topic: "JavaScript Functions",
			stars: 3,
			level: "Hard",
		},
		{
			_id: "lesson4",
			topic: "JavaScript Arrays and Objects",
			stars: 3.5,
			level: "Easy",
		},
		{
			_id: "lesson5",
			topic: "JavaScript DOM Manipulation",
			stars: 4,
			level: "Medium",
		},
		{
			_id: "lesson6",
			topic: "JavaScript Events and Event Handling",
			stars: 5,
			level: "Hard",
		},
		{
			_id: "lesson7",
			topic: "JavaScript Promises and Async/Await",
			stars: 2.5,
			level: "Easy",
		},
		{
			_id: "lesson8",
			topic: "JavaScript Error Handling and Debugging",
			stars: 4.5,
			level: "Medium",
		},
		{
			_id: "lesson9",
			topic: "JavaScript ES6 Features",
			stars: 3.5,
			level: "Hard",
		},
		{
			_id: "lesson10",
			topic: "JavaScript APIs and AJAX",
			stars: 2,
			level: "Easy",
		},
		{
			_id: "lesson11",
			topic: "JavaScript Frameworks and Libraries",
			stars: 4.5,
			level: "Medium",
		},
		{
			_id: "lesson12",
			topic: "JavaScript Testing and Debugging",
			stars: 3.5,
			level: "Hard",
		},
		{
			_id: "lesson13",
			topic: "JavaScript Best Practices",
			stars: 2,
			level: "Easy",
		},
		{
			_id: "lesson14",
			topic: "JavaScript Performance Optimization",
			stars: 4.5,
			level: "Medium",
		},
		{
			_id: "lesson15",
			topic: "JavaScript Security",
			stars: 3.5,
			level: "Hard",
		},
	],
};

export const lessonDetailData: LessonDetailType = {
	_id: "lesson_001",
	courseId: "course_001",
	topic: "Array Manipulation",
	name: "Sum of Two Arrays",
	stars: 4,
	learner: 123,
	level: 2,
	content: `
## Bài toán

Cho 2 mảng số nguyên, hãy tính tổng các phần tử của cả hai mảng.

## Input
- Một mảng \`num1: number[]\`
- Một mảng \`num2: number[]\`

## Output
- Trả về tổng của tất cả phần tử trong \`num1\` và \`num2\`
  `,
	structureAnswer: `
function sumArrays(num1, num2) {
  // TODO: Implement
}
  `,
	example: [
		{
			input: [
				{name: "num1", value: "[1, 2, 3]"},
				{name: "num2", value: "[4, 5, 6]"},
			],
			explanation: "Tổng = 1+2+3+4+5+6 = 21",
			output: "21",
		},
	],
	status: "approved" as StatusPlace.APPROVED,
	testcase: [
		{
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
			],
			output: "10",
			isHidden: false,
		},
		{
			input: [
				{name: "num1", value: "[10]"},
				{name: "num2", value: "[5, 5]"},
			],
			output: "20",
			isHidden: true,
		},
	],
};
