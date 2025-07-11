import {
	CourseDetailType,
	CourseStateType,
	LanguageType,
	lessonsCourseType,
	LessonType,
	ProblemDetailType,
	ProblemStateType,
	ProblemTemplateType,
	ProblemTestcaseType,
	TopicType,
	UserProblemType,
} from '@/types';
import {Id} from '../../convex/_generated/dataModel';

export const courseData: CourseStateType[] = [
	{
		_id: '123' as Id<'courses'>,
		language: 'JavaScript',
		name: 'JavaScript Course',
		description:
			'JavaScript is the programming language of the Web. JavaScript is easy to learn.',
		banner: '/images/banner-Javascript.png',
		authorId: '123456',
		learner: 200,
		status: 'public',
		lessons: 15,
		_creationTime: 0,
		document: 'hello world',
		logo: '/icon/default/javascript.svg',
	},
	{
		_id: '345' as Id<'courses'>,
		language: 'TypeScript',
		name: 'TypeScript Course',
		description:
			'TypeScript is a strict syntactical superset of JavaScript and adds optional static typing to the language.',
		banner: '/images/banner-typescript.png',
		authorId: '234567',
		learner: 150,
		status: 'public',
		lessons: 10,
		_creationTime: 0,
		document: '',
		logo: '/icon/default/typescript.svg',
	},
	{
		_id: '456' as Id<'courses'>,
		language: 'Java',
		name: 'Java Course',
		description: 'Java is a high-level, class-based, object-oriented programming language.',
		banner: '/images/banner-java.png',
		authorId: '789012',
		learner: 300,
		status: 'public',
		lessons: 12,
		_creationTime: 0,
		document: '',
		logo: '/icon/default/java.svg',
	},

	{
		_id: '789' as Id<'courses'>,
		language: 'Python',
		name: 'Python Course',
		description: 'Python is powerful... and fast.',
		banner: '/images/banner-python.png',
		authorId: '345678',
		learner: 250,
		status: 'public',
		lessons: 15,
		_creationTime: 0,
		document: '',
		logo: '/icon/default/python.svg',
	},
	{
		_id: '101112' as Id<'courses'>,
		language: 'C++',
		name: 'C++ Course',
		description:
			'C++ supports multiple programming paradigms and low-level memory manipulation.',
		banner: '/images/banner-cpp.png',
		authorId: '901234',
		learner: 180,
		status: 'public',
		lessons: 11,
		_creationTime: 0,
		document: '',
		logo: '/icon/default/cpp.svg',
	},
	{
		_id: '131415' as Id<'courses'>,
		language: 'C#',
		name: 'C# Course',
		description: 'C# is a modern, object-oriented language for .NET applications.',
		banner: '/images/banner-csharp.png',
		authorId: '161718',
		learner: 220,
		status: 'public',
		lessons: 13,
		_creationTime: 0,
		document: '',
		logo: '/icon/default/csharp.svg',
	},
];

export const lessonsCourseData: lessonsCourseType = {
	courseId: '123' as Id<'courses'>,
	status: 'public',
	lessons: [
		{
			_id: 'lesson_001' as Id<'lessons'>,
			name: 'Introduction to JavaScript',
			status: 'public',
			level: 'easy',
		},
		{
			_id: 'lesson2' as Id<'lessons'>,
			name: 'JavaScript Variables and Data Types',
			status: 'public',
			level: 'medium',
		},
		{
			_id: 'lesson3' as Id<'lessons'>,
			name: 'JavaScript Functions',
			status: 'private',
			level: 'hard',
		},
		{
			_id: 'lesson4' as Id<'lessons'>,
			name: 'JavaScript Arrays and Objects',
			status: 'public',
			level: 'hard',
		},
		{
			_id: 'lesson5' as Id<'lessons'>,
			name: 'JavaScript DOM Manipulation',
			status: 'public',
			level: 'medium',
		},
		{
			_id: 'lesson6' as Id<'lessons'>,
			name: 'JavaScript Events and Event Handling',
			status: 'private',
			level: 'hard',
		},
		{
			_id: 'lesson7' as Id<'lessons'>,
			name: 'JavaScript Promises and Async/Await',
			status: 'public',
			level: 'easy',
		},
		{
			_id: 'lesson8' as Id<'lessons'>,
			name: 'JavaScript Error Handling and Debugging',
			status: 'public',
			level: 'medium',
		},
		{
			_id: 'lesson9' as Id<'lessons'>,
			name: 'JavaScript ES6 Features',
			status: 'private',
			level: 'hard',
		},
		{
			_id: 'lesson10' as Id<'lessons'>,
			name: 'JavaScript APIs and AJAX',
			status: 'public',
			level: 'easy',
		},
		{
			_id: 'lesson11' as Id<'lessons'>,
			name: 'JavaScript Frameworks and Libraries',
			status: 'public',
			level: 'medium',
		},
		{
			_id: 'lesson12' as Id<'lessons'>,
			name: 'JavaScript Testing and Debugging',
			status: 'private',
			level: 'hard',
		},
		{
			_id: 'lesson13' as Id<'lessons'>,
			name: 'JavaScript Best Practices',
			status: 'public',
			level: 'easy',
		},
		{
			_id: 'lesson14' as Id<'lessons'>,
			name: 'JavaScript Performance Optimization',
			status: 'public',
			level: 'medium',
		},
		{
			_id: 'lesson15' as Id<'lessons'>,
			name: 'JavaScript Security',
			status: 'private',
			level: 'hard',
		},
	],
};

export const topicData: TopicType[] = [
	{
		_id: '1' as Id<'topics'>,
		name: 'Array',
		status: 'public',
	},
	{
		_id: '2' as Id<'topics'>,
		name: 'String',
		status: 'public',
	},
	{
		_id: '3' as Id<'topics'>,
		name: 'Math',
		status: 'public',
	},
];

export const problemData: ProblemStateType[] = [
	{
		_id: '1234' as Id<'problems'>,
		level: 'easy',
		name: 'Sum of Two Numbers',
		topic: {
			_id: '1' as Id<'topics'>,
			name: 'Array',
			status: 'public',
		},
		state: 'completed',
	},
	{
		_id: '2345' as Id<'problems'>,
		level: 'medium',
		name: 'Two Sum',
		topic: {
			_id: '2' as Id<'topics'>,
			name: 'String',
			status: 'public',
		},
		state: 'progress',
	},
	{
		_id: '3456' as Id<'problems'>,
		level: 'hard',
		name: 'Longest Substring Without Repeating Characters',
		topic: {
			_id: '2' as Id<'topics'>,
			name: 'String',
			status: 'public',
		},
		state: 'unsolved',
	},
	{
		_id: '4567' as Id<'problems'>,
		level: 'easy',
		name: 'Valid Parentheses',
		topic: {
			_id: '2' as Id<'topics'>,
			name: 'String',
			status: 'public',
		},
		state: 'completed',
	},
	{
		_id: '5678' as Id<'problems'>,
		level: 'medium',
		name: '3Sum',
		topic: {
			_id: '1' as Id<'topics'>,
			name: 'Array',
			status: 'public',
		},
		state: 'progress',
	},
	{
		_id: '6789' as Id<'problems'>,
		level: 'hard',
		name: 'Median of Two Sorted Arrays',
		topic: {
			_id: '3' as Id<'topics'>,
			name: 'Math',
			status: 'public',
		},
		state: 'unsolved',
	},
	{
		_id: '7890' as Id<'problems'>,
		level: 'easy',
		name: 'Reverse Integer',
		topic: {
			_id: '3' as Id<'topics'>,
			name: 'Math',
			status: 'public',
		},
		state: 'completed',
	},
	{
		_id: '8901' as Id<'problems'>,
		level: 'medium',
		name: 'Longest Palindromic Substring',
		topic: {
			_id: '2' as Id<'topics'>,
			name: 'String',
			status: 'public',
		},
		state: 'progress',
	},
	{
		_id: '6799' as Id<'problems'>,
		level: 'hard',
		name: 'Container With Most Water',
		topic: {
			_id: '1' as Id<'topics'>,
			name: 'Array',
			status: 'public',
		},
		state: 'unsolved',
	},
	{
		_id: '6712' as Id<'problems'>,
		level: 'easy',
		name: 'Roman to Integer',
		topic: {
			_id: '2' as Id<'topics'>,
			name: 'String',
			status: 'public',
		},
		state: 'completed',
	},
];

export const CourseDetailData: CourseDetailType = {
	_id: '123' as Id<'courses'>,
	language: 'JavaScript',
	name: 'JavaScript Course',
	description: 'JavaScript is the programming language of the Web. JavaScript is easy to learn.',
	banner: '/images/banner-Javascript.png',
	authorId: '123456',
	learner: 200,
	status: 'public',
	_creationTime: 0,
	document: 'hello world',
	logo: '/icon/default/javascript.svg',
	authorName: 'Anonymous',
	authorImage: 'https://github.com/shadcn.png',
	lessons: 15,
};

export const listLessonData: LessonType[] = [
	{
		_id: 'lesson_001' as Id<'lessons'>,
		name: 'Introduction to JavaScript',
		level: 'easy',
		status: 'public',
	},
	{
		_id: 'lesson2' as Id<'lessons'>,
		name: 'JavaScript Variables and Data Types',
		level: 'medium',
		status: 'public',
	},
	{
		_id: 'lesson3' as Id<'lessons'>,
		name: 'JavaScript Functions',
		level: 'hard',
		status: 'private',
	},
	{
		_id: 'lesson4' as Id<'lessons'>,
		name: 'JavaScript Arrays and Objects',
		level: 'hard',
		status: 'public',
	},
	{
		_id: 'lesson5' as Id<'lessons'>,
		name: 'JavaScript DOM Manipulation',
		level: 'medium',
		status: 'public',
	},
	{
		_id: 'lesson6' as Id<'lessons'>,
		name: 'JavaScript Events and Event Handling',
		level: 'hard',
		status: 'private',
	},
	{
		_id: 'lesson7' as Id<'lessons'>,
		name: 'JavaScript Promises and Async/Await',
		level: 'easy',
		status: 'public',
	},
	{
		_id: 'lesson8' as Id<'lessons'>,
		name: 'JavaScript Error Handling and Debugging',
		level: 'medium',
		status: 'public',
	},
	{
		_id: 'lesson9' as Id<'lessons'>,
		name: 'JavaScript ES6 Features',
		level: 'hard',
		status: 'private',
	},
	{
		_id: 'lesson10' as Id<'lessons'>,
		name: 'JavaScript APIs and AJAX',
		level: 'easy',
		status: 'public',
	},
	{
		_id: 'lesson11' as Id<'lessons'>,
		name: 'JavaScript Frameworks and Libraries',
		level: 'medium',
		status: 'public',
	},
	{
		_id: 'lesson12' as Id<'lessons'>,
		name: 'JavaScript Testing and Debugging',
		level: 'hard',
		status: 'private',
	},
	{
		_id: 'lesson13' as Id<'lessons'>,
		name: 'JavaScript Best Practices',
		level: 'easy',
		status: 'public',
	},
	{
		_id: 'lesson14' as Id<'lessons'>,
		name: 'JavaScript Performance Optimization',
		level: 'medium',
		status: 'public',
	},
	{
		_id: 'lesson15' as Id<'lessons'>,
		name: 'JavaScript Security',
		level: 'hard',
		status: 'private',
	},
];

export const ProblemDetailData: ProblemDetailType = {
	_id: 'prob123456' as Id<'problems'>,
	_creationTime: Date.now(),
	name: 'Sum of Two Numbers',
	content: 'Write a function that takes two numbers and returns their sum.',
	level: 'easy',
	answer: {
		javascript: 'function sum(a, b) {\n  return a + b;\n}',
		typescript: 'function sum(a: number, b: number) {\n  return a + b;\n}',
		python: 'def sum(a, b):\n    return a + b',
		java: 'public int sum(int a, int b) {\n    return a + b;\n}',
		csharp: 'public int Sum(int a, int b) {\n    return a + b;\n}',
		cpp: 'int sum(int a, int b) {\n    return a + b;\n}',
	},

	status: 'private',
	topic: {
		_id: '1' as Id<'topics'>,
		name: 'Array',
		status: 'public',
	},
	authorId: 'user789',
	authorName: 'John Doe',
	authorImage: 'https://github.com/shadcn.png',
};

export const ProblemTestcaseData: ProblemTestcaseType = {
	problemId: 'prob123456' as Id<'problems'>,
	isPublic: false,
	testcase: [
		{
			id: 'tc1',
			inputs: [
				{id: 'a', label: 'arg1', value: '2'},
				{id: 'b', label: 'arg2', value: '3'},
			],
			expected: '5',
		},
		{
			id: 'tc2',
			inputs: [
				{id: 'a', label: 'arg1', value: '-1'},
				{id: 'b', label: 'arg2', value: '4'},
			],
			expected: '3',
		},
		{
			id: 'tc3',
			inputs: [
				{id: 'a', label: 'arg1', value: '0'},
				{id: 'b', label: 'arg2', value: '0'},
			],
			expected: '0',
		},
		{
			id: 'tc4',
			inputs: [
				{id: 'a', label: 'arg1', value: '100'},
				{id: 'b', label: 'arg2', value: '200'},
			],
			expected: '300',
		},
		{
			id: 'tc5',
			inputs: [
				{id: 'a', label: 'arg1', value: '123456789'},
				{id: 'b', label: 'arg2', value: '987654321'},
			],
			expected: '1111111110',
		},
		{
			id: 'tc6',
			inputs: [
				{id: 'a', label: 'arg1', value: '999999999'},
				{id: 'b', label: 'arg2', value: '1'},
			],
			expected: '1000000000',
		},
		{
			id: 'tc7',
			inputs: [
				{id: 'a', label: 'arg1', value: '-100'},
				{id: 'b', label: 'arg2', value: '-200'},
			],
			expected: '-300',
		},
	],
};

export const ProblemTemplateData: ProblemTemplateType = {
	problemId: 'prob123456' as Id<'problems'>,
	isPublic: false,
	code: {
		javascript:
			'// Your solution in JavaScript\nfunction sum(a, b) {\n  // TODO: implement\n}\n// End of solution',
		typescript: 'function sum(a: number, b: number) {\n  // TODO: implement\n}',
		python: 'def sum(a, b):\n    # TODO: implement',
		java: 'public int sum(int a, int b) {\n    // TODO: implement\n}',
		csharp: 'public int Sum(int a, int b) {\n    // TODO: implement\n}',
		cpp: 'int sum(int a, int b) {\n    // TODO: implement\n}',
	},
	template: {
		javascript: {
			head: '// Your solution in JavaScript\n',
			body: 'function sum(a, b) {\n  // TODO: implement\n}',
			tail: '\n// End of solution',
		},
		typescript: {
			head: '// Your solution in TypeScript\n',
			body: 'function sum(a: number, b: number) {\n  // TODO: implement\n}',
			tail: '\n// End of solution',
		},
		python: {
			head: '# Your solution in Python\n',
			body: 'def sum(a, b):\n    # TODO: implement',
			tail: '\n# End of solution',
		},
		java: {
			head: '// Your solution in Java\npublic class Solution {\n',
			body: '    public int sum(int a, int b) {\n        // TODO: implement\n    }',
			tail: '\n}',
		},
		csharp: {
			head: '// Your solution in C#\npublic class Solution {\n',
			body: '    public int Sum(int a, int b) {\n        // TODO: implement\n    }',
			tail: '\n}',
		},
		cpp: {
			head: '// Your solution in C++\n',
			body: 'int sum(int a, int b) {\n    // TODO: implement\n}',
			tail: '\n// End of solution',
		},
	},
};

export const UserProblemData: UserProblemType = {
	_id: 'userProb123' as Id<'user_problem'>,
	_creationTime: Date.now(),
	code: {
		javascript: 'function sum(a, b) {\n  return a + b;\n}',
		python: 'def sum(a, b):\n    return a + b',
	},
	state: 'completed',
	userId: 'user789',
	problemId: 'prob123456' as Id<'problems'>,
};

export const LanguageData: LanguageType[] = [
	{
		_id: 'rs70hama6aw5h9havyf8k5w5nn7k9d34' as Id<'languages'>,
		value: 'javascript',
		idJude0: 63,
		name: 'JavaScript',
		_creationTime: 1751904162519.7346,
	},
	{
		_id: 'rs732jarak5t2pjn65razddxwh7k8zh2' as Id<'languages'>,
		value: 'typescript',
		idJude0: 74,
		name: 'TypeScript',
		_creationTime: 1751904220758.2996,
	},
	{
		_id: 'rs71fz19hjgyh0ychexfwxf21n7k9qn2' as Id<'languages'>,
		value: 'python',
		idJude0: 71,
		name: 'Python',
		_creationTime: 1751904271410.8945,
	},
	{
		_id: 'rs7fb176vxk098w81wvpxf06qn7k97c1' as Id<'languages'>,
		value: 'java',
		idJude0: 62,
		name: 'Java',
		_creationTime: 1751904271410.8948,
	},
	{
		_id: 'rs76dtqyrtdyjqez6w7w0ysa2n7k8ax3' as Id<'languages'>,
		value: 'cpp',
		idJude0: 51,
		name: 'C#',
		_creationTime: 1751904271410.895,
	},
	{
		_id: 'rs7c0g7bjf63b89v7ne5crhgzn7k8w22' as Id<'languages'>,
		value: 'csharp',
		idJude0: 54,
		name: 'C++',
		_creationTime: 1751904271410.8953,
	},
];
