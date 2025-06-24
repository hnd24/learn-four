import {
	CourseDetailType,
	CourseStateType,
	LessonDetailType,
	LessonType,
	ProblemStateType,
	StatusPlace,
	UserLessonType,
	UserStateType,
} from '@/types';

export const courseData: CourseStateType[] = [
	{
		_id: '123',
		language: 'JavaScript',
		description:
			'JavaScript is the programming language of the Web. JavaScript is easy to learn.',
		banner: '/images/banner-Javascript.png',
		authorId: '123456',
		learner: 200,
		status: 'public',
		lessons: 15,
		_creationTime: 0,
		content: 'hello world',
		logo: '/icon/default/javascript.svg',
	},
	{
		_id: '345',
		language: 'TypeScript',
		description:
			'TypeScript is a strict syntactical superset of JavaScript and adds optional static typing to the language.',
		banner: '/images/banner-typescript.png',
		authorId: '234567',
		learner: 150,
		status: 'public',
		lessons: 10,
		_creationTime: 0,
		content: '',
		logo: '/icon/default/typescript.svg',
	},
	{
		_id: '456',
		language: 'Java',
		description: 'Java is a high-level, class-based, object-oriented programming language.',
		banner: '/images/banner-java.png',
		authorId: '789012',
		learner: 300,
		status: 'public',
		lessons: 12,
		_creationTime: 0,
		content: '',
		logo: '/icon/default/java.svg',
	},

	{
		_id: '789',
		language: 'Python',
		description: 'Python is powerful... and fast.',
		banner: '/images/banner-python.png',
		authorId: '345678',
		learner: 250,
		status: 'public',
		lessons: 15,
		_creationTime: 0,
		content: '',
		logo: '/icon/default/python.svg',
	},
	{
		_id: '101112',
		language: 'C++',
		description:
			'C++ supports multiple programming paradigms and low-level memory manipulation.',
		banner: '/images/banner-cpp.png',
		authorId: '901234',
		learner: 180,
		status: 'public',
		lessons: 11,
		_creationTime: 0,
		content: '',
		logo: '/icon/default/cpp.svg',
	},
	{
		_id: '131415',
		language: 'C#',
		description: 'C# is a modern, object-oriented language for .NET applications.',
		banner: '/images/banner-csharp.png',
		authorId: '161718',
		learner: 220,
		status: 'public',
		lessons: 13,
		_creationTime: 0,
		content: '',
		logo: '/icon/default/csharp.svg',
	},
];

export const defaultBanner = [
	{
		_id: 'default',
		background: 'from-[#484ce3] to-[#a6bcfb]',
		language: 'Learn Four',
		description:
			'This place helps you learn programming Language. As well as challenge each other with coding problems to improve your skills together',
		logoLanguage: '/images/programer.svg',
	},
];

export const problemData: ProblemStateType[] = [
	{
		_id: '1234',
		level: 'Easy',
		name: 'Sum of Two Numbers',
		topic: 'Array',
		star: 4.5,
	},
	{
		_id: '1234',
		level: 'Medium',
		name: 'Two Sum',
		topic: 'Array',
		star: 5,
	},
	{
		_id: '1234',
		level: 'Hard',
		name: 'Longest Substring Without Repeating Characters',
		topic: 'String',
		star: 3,
	},
	{
		_id: '1234',
		level: 'Easy',
		name: 'Valid Parentheses',
		topic: 'String',
		star: 3.5,
	},
	{
		_id: '1234',
		level: 'Medium',
		name: '3Sum',
		topic: 'Array',
		star: 4,
	},
	{
		_id: '1234',
		level: 'Hard',
		name: 'Median of Two Sorted Arrays',
		topic: 'Array',
		star: 5,
	},
	{
		_id: '1234',
		level: 'Easy',
		name: 'Reverse Integer',
		topic: 'Math',
		star: 2.5,
	},
	{
		_id: '1234',
		level: 'Medium',
		name: 'Longest Palindromic Substring',
		topic: 'String',
		star: 4.5,
	},
	{
		_id: '1234',
		level: 'Hard',
		name: 'Container With Most Water',
		topic: 'Array',
		star: 3.5,
	},
	{
		_id: '1234',
		level: 'Easy',
		name: 'Roman to Integer',
		topic: 'Math',
		star: 2,
	},
];

export const userData: UserStateType = {
	userId: '123',
	name: 'Anonymous',
	email: 'xyz@gmail.com',
	image: 'https://github.com/shadcn.png',
};

export const CourseDetailData: CourseDetailType = {
	_id: '123',
	language: 'JavaScript',
	description: 'JavaScript is the programming language of the Web. JavaScript is easy to learn.',
	banner: '/images/banner-Javascript.png',
	authorId: '123456',
	learner: 200,
	status: 'public',
	_creationTime: 0,
	content: 'hello world',
	logo: '/icon/default/javascript.svg',
	authorName: 'Anonymous',
	authorImage: 'https://github.com/shadcn.png',
	lessons: [
		{
			_id: 'lesson_001',
			name: 'Introduction to JavaScript',
			level: 'easy',
		},
		{
			_id: 'lesson2',
			name: 'JavaScript Variables and Data Types',
			level: 'medium',
		},
		{
			_id: 'lesson3',
			name: 'JavaScript Functions',
			level: 'hard',
		},
		{
			_id: 'lesson4',
			name: 'JavaScript Arrays and Objects',
			level: 'hard',
		},
		{
			_id: 'lesson5',
			name: 'JavaScript DOM Manipulation',
			level: 'medium',
		},
		{
			_id: 'lesson6',
			name: 'JavaScript Events and Event Handling',
			level: 'hard',
		},
		{
			_id: 'lesson7',
			name: 'JavaScript Promises and Async/Await',
			level: 'easy',
		},
		{
			_id: 'lesson8',
			name: 'JavaScript Error Handling and Debugging',
			level: 'medium',
		},
		{
			_id: 'lesson9',
			name: 'JavaScript ES6 Features',
			level: 'hard',
		},
		{
			_id: 'lesson10',
			name: 'JavaScript APIs and AJAX',
			level: 'easy',
		},
		{
			_id: 'lesson11',
			name: 'JavaScript Frameworks and Libraries',
			level: 'medium',
		},
		{
			_id: 'lesson12',
			name: 'JavaScript Testing and Debugging',
			level: 'hard',
		},
		{
			_id: 'lesson13',
			name: 'JavaScript Best Practices',
			level: 'easy',
		},
		{
			_id: 'lesson14',
			name: 'JavaScript Performance Optimization',
			level: 'medium',
		},
		{
			_id: 'lesson15',
			name: 'JavaScript Security',
			level: 'hard',
		},
	],
};

export const listLessonData: LessonType[] = [
	{
		_id: 'lesson_001',
		name: 'Introduction to JavaScript',
		level: 'easy',
	},
	{
		_id: 'lesson2',
		name: 'JavaScript Variables and Data Types',
		level: 'medium',
	},
	{
		_id: 'lesson3',
		name: 'JavaScript Functions',
		level: 'hard',
	},
	{
		_id: 'lesson4',
		name: 'JavaScript Arrays and Objects',
		level: 'hard',
	},
	{
		_id: 'lesson5',
		name: 'JavaScript DOM Manipulation',
		level: 'medium',
	},
	{
		_id: 'lesson6',
		name: 'JavaScript Events and Event Handling',
		level: 'hard',
	},
	{
		_id: 'lesson7',
		name: 'JavaScript Promises and Async/Await',
		level: 'easy',
	},
	{
		_id: 'lesson8',
		name: 'JavaScript Error Handling and Debugging',
		level: 'medium',
	},
	{
		_id: 'lesson9',
		name: 'JavaScript ES6 Features',
		level: 'hard',
	},
	{
		_id: 'lesson10',
		name: 'JavaScript APIs and AJAX',
		level: 'easy',
	},
	{
		_id: 'lesson11',
		name: 'JavaScript Frameworks and Libraries',
		level: 'medium',
	},
	{
		_id: 'lesson12',
		name: 'JavaScript Testing and Debugging',
		level: 'hard',
	},
	{
		_id: 'lesson13',
		name: 'JavaScript Best Practices',
		level: 'easy',
	},
	{
		_id: 'lesson14',
		name: 'JavaScript Performance Optimization',
		level: 'medium',
	},
	{
		_id: 'lesson15',
		name: 'JavaScript Security',
		level: 'hard',
	},
];

export const lessonDetailData: LessonDetailType = {
	_id: 'lesson_001',
	courseId: 'course_001',
	topic: 'Array Manipulation',
	name: 'Sum of Two Arrays',
	star: 4,
	learner: 123,
	level: 2,
	nameFn: 'sumArrays',
	setupAnswer: {
		header: {
			cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n',
			csharp: 'using System;',
		},
		printFn: {},
	},
	structureAnswer: {
		javascript: 'function sumArrays(num1, num2) {\n\t// Your code here\n}',
		typescript:
			'function sumArrays(num1: number[], num2: number[]): number {\n\t// Your code here\n}',
		python: 'def sum_arrays(num1, num2):\n\t# Your code here',
		java: 'public static int sumArrays(int[] num1, int[] num2) {\n\t// Your code here\n}',
		cpp: `//#include <iostream>\n//#include <vector>\n//using namespace std;
int sumArrays(const vector<int>& num1, const vector<int>& num2) {
	// Your code here
	// return 0;
}`,
		csharp: `//using System;
public class SumArrays {
	public static int SumArrays(int[] num1, int[] num2) {
		// Your code here
		// return 0;
	}	
}`,
	},
	content: `
## Bài toán

Cho 2 mảng số nguyên, hãy tính tổng các phần tử của cả hai mảng.

## Input
- Một mảng \`num1: number[]\`
- Một mảng \`num2: number[]\`

## Output
- Trả về tổng của tất cả phần tử trong \`num1\` và \`num2\`
`,
	status: StatusPlace.APPROVED,
	testcaseSample: [
		{
			input: [
				{name: 'num1', value: '[1, 2]', valueType: 'int', isArray: true},
				{name: 'num2', value: '[3, 4]', valueType: 'int', isArray: true},
			],
			except: '10',
		},
		{
			input: [
				{name: 'num1', value: '[10]', valueType: 'int', isArray: true},
				{name: 'num2', value: '[5, 5]', valueType: 'int', isArray: true},
			],
			except: '20',
		},
		{
			input: [
				{name: 'num1', value: '[1, 2]', valueType: 'int', isArray: true},
				{name: 'num2', value: '[3, 4]', valueType: 'int', isArray: true},
			],
			except: '10',
		},
	],
	answer: {
		code: [
			{
				javascript: `
function sumArrays(num1, num2) {
	let sum = 0;
	for (let i = 0; i < num1.length; i++) {
		sum += num1[i];
	}
	for (let i = 0; i < num2.length; i++) {
		sum += num2[i];
	}
	return sum;
}
				`,
				typescript: `
function sumArrays(num1: number[], num2: number[]): number {
	let sum = 0;
	for (let i = 0; i < num1.length; i++) {
		sum += num1[i];
	}
	for (let i = 0; i < num2.length; i++) {
		sum += num2[i];
	}
	return sum;
}
				`,
				python: `
def sum_arrays(num1, num2):
	sum = 0
	for i in range(len(num1)):
		sum += num1[i]
	for i in range(len(num2)):
		sum += num2[i]
	return sum
				`,
				java: `
public class SumArrays {
	public static int sumArrays(int[] num1, int[] num2) {
		int sum = 0;
		for (int i = 0; i < num1.length; i++) {
			sum += num1[i];
		}
		for (int i = 0; i < num2.length; i++) {
			sum += num2[i];
		}
		return sum;
	}
}
				`,
				cpp: `
#include <iostream>
#include <vector>
using namespace std;
int sumArrays(const vector<int>& num1, const vector<int>& num2) {
	int sum = 0;
	for (int i = 0; i < num1.size(); i++) {
		sum += num1[i];
	}
	for (int i = 0; i < num2.size(); i++) {
		sum += num2[i];
	}
	return sum;
}
				`,
				csharp: `
public class SumArrays {
	public static int SumArrays(int[] num1, int[] num2) {
		int sum = 0;
		for (int i = 0; i < num1.Length; i++) {
			sum += num1[i];
		}
		for (int i = 0; i < num2.Length; i++) {
			sum += num2[i];
		}
		return sum;
	}	
}
				`,
			},
		],
		testcase: [
			{
				input: [
					{name: 'num1', value: '[1, 2]', valueType: 'int', isArray: true},
					{name: 'num2', value: '[3, 4]', valueType: 'int', isArray: true},
				],
				except: '10',
			},
			{
				input: [
					{name: 'num1', value: '[10]', valueType: 'int', isArray: true},
					{name: 'num2', value: '[5, 5]', valueType: 'int', isArray: true},
				],
				except: '20',
			},
			{
				input: [
					{name: 'num1', value: '[1, 2, 3]', valueType: 'int', isArray: true},
					{name: 'num2', value: '[4, 5, 6]', valueType: 'int', isArray: true},
				],
				except: '21',
			},
		],
	},
};

export const userLessonData: UserLessonType = {
	_id: 'lesson_001',
	lessonId: 'lesson_001',
	userId: 'user_001',
	isCompleted: true,
	code: {
		javascript: `
function sumArrays(num1, num2) {
	let sum = 0;
	for (let i = 0; i < num1.length; i++) {
		sum += num1[i];
	}
	for (let i = 0; i < num2.length; i++) {
		sum += num2[i];
	}
	return sum;
}
		`,
		typescript: `
function sumArrays(num1: number[], num2: number[]): number {
	let sum = 0;
	for (let i = 0; i < num1.length; i++) {
		sum += num1[i];
	}
	for (let i = 0; i < num2.length; i++) {
		sum += num2[i];
	}
	return sum;
}
		`,
	},
};
