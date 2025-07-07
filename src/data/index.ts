import {
	CourseDetailType,
	CourseStateType,
	LessonType,
	ProblemDetailType,
	ProblemStateType,
	TopicType,
	UserProblemType,
} from '@/types';
import {Id} from '../../convex/_generated/dataModel';

export const courseData: CourseStateType[] = [
	{
		_id: '123' as Id<'courses'>,
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
		_id: '345' as Id<'courses'>,
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
		_id: '456' as Id<'courses'>,
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
		_id: '789' as Id<'courses'>,
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
		_id: '101112' as Id<'courses'>,
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
		_id: '131415' as Id<'courses'>,
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
			_id: 'lesson_001' as Id<'lessons'>,
			name: 'Introduction to JavaScript',
			level: 'easy',
		},
		{
			_id: 'lesson2' as Id<'lessons'>,
			name: 'JavaScript Variables and Data Types',
			level: 'medium',
		},
		{
			_id: 'lesson3' as Id<'lessons'>,
			name: 'JavaScript Functions',
			level: 'hard',
		},
		{
			_id: 'lesson4' as Id<'lessons'>,
			name: 'JavaScript Arrays and Objects',
			level: 'hard',
		},
		{
			_id: 'lesson5' as Id<'lessons'>,
			name: 'JavaScript DOM Manipulation',
			level: 'medium',
		},
		{
			_id: 'lesson6' as Id<'lessons'>,
			name: 'JavaScript Events and Event Handling',
			level: 'hard',
		},
		{
			_id: 'lesson7' as Id<'lessons'>,
			name: 'JavaScript Promises and Async/Await',
			level: 'easy',
		},
		{
			_id: 'lesson8' as Id<'lessons'>,
			name: 'JavaScript Error Handling and Debugging',
			level: 'medium',
		},
		{
			_id: 'lesson9' as Id<'lessons'>,
			name: 'JavaScript ES6 Features',
			level: 'hard',
		},
		{
			_id: 'lesson10' as Id<'lessons'>,
			name: 'JavaScript APIs and AJAX',
			level: 'easy',
		},
		{
			_id: 'lesson11' as Id<'lessons'>,
			name: 'JavaScript Frameworks and Libraries',
			level: 'medium',
		},
		{
			_id: 'lesson12' as Id<'lessons'>,
			name: 'JavaScript Testing and Debugging',
			level: 'hard',
		},
		{
			_id: 'lesson13' as Id<'lessons'>,
			name: 'JavaScript Best Practices',
			level: 'easy',
		},
		{
			_id: 'lesson14' as Id<'lessons'>,
			name: 'JavaScript Performance Optimization',
			level: 'medium',
		},
		{
			_id: 'lesson15' as Id<'lessons'>,
			name: 'JavaScript Security',
			level: 'hard',
		},
	],
};

export const listLessonData: LessonType[] = [
	{
		_id: 'lesson_001' as Id<'lessons'>,
		name: 'Introduction to JavaScript',
		level: 'easy',
	},
	{
		_id: 'lesson2' as Id<'lessons'>,
		name: 'JavaScript Variables and Data Types',
		level: 'medium',
	},
	{
		_id: 'lesson3' as Id<'lessons'>,
		name: 'JavaScript Functions',
		level: 'hard',
	},
	{
		_id: 'lesson4' as Id<'lessons'>,
		name: 'JavaScript Arrays and Objects',
		level: 'hard',
	},
	{
		_id: 'lesson5' as Id<'lessons'>,
		name: 'JavaScript DOM Manipulation',
		level: 'medium',
	},
	{
		_id: 'lesson6' as Id<'lessons'>,
		name: 'JavaScript Events and Event Handling',
		level: 'hard',
	},
	{
		_id: 'lesson7' as Id<'lessons'>,
		name: 'JavaScript Promises and Async/Await',
		level: 'easy',
	},
	{
		_id: 'lesson8' as Id<'lessons'>,
		name: 'JavaScript Error Handling and Debugging',
		level: 'medium',
	},
	{
		_id: 'lesson9' as Id<'lessons'>,
		name: 'JavaScript ES6 Features',
		level: 'hard',
	},
	{
		_id: 'lesson10' as Id<'lessons'>,
		name: 'JavaScript APIs and AJAX',
		level: 'easy',
	},
	{
		_id: 'lesson11' as Id<'lessons'>,
		name: 'JavaScript Frameworks and Libraries',
		level: 'medium',
	},
	{
		_id: 'lesson12' as Id<'lessons'>,
		name: 'JavaScript Testing and Debugging',
		level: 'hard',
	},
	{
		_id: 'lesson13' as Id<'lessons'>,
		name: 'JavaScript Best Practices',
		level: 'easy',
	},
	{
		_id: 'lesson14' as Id<'lessons'>,
		name: 'JavaScript Performance Optimization',
		level: 'medium',
	},
	{
		_id: 'lesson15' as Id<'lessons'>,
		name: 'JavaScript Security',
		level: 'hard',
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
		typescript: 'function sum(a: number, b: number): number {\n  return a + b;\n}',
		python: 'def sum(a, b):\n    return a + b',
		java: 'public int sum(int a, int b) {\n    return a + b;\n}',
		csharp: 'public int Sum(int a, int b) {\n    return a + b;\n}',
		cpp: 'int sum(int a, int b) {\n    return a + b;\n}',
	},
	template: {
		javascript: {
			head: '// Your solution in JavaScript\n',
			body: 'function sum(a, b) {\n  // TODO: implement\n}',
			tail: '\n// End of solution',
		},
		typescript: {
			head: '// Your solution in TypeScript\n',
			body: 'function sum(a: number, b: number): number {\n  // TODO: implement\n}',
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
	testcase: [
		{
			id: 'tc1',
			inputs: [
				{id: 'a', label: 'a', value: '2'},
				{id: 'b', label: 'b', value: '3'},
			],
			expected: '5',
		},
		{
			id: 'tc2',
			inputs: [
				{id: 'a', label: 'a', value: '-1'},
				{id: 'b', label: 'b', value: '4'},
			],
			expected: '3',
		},
	],
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
