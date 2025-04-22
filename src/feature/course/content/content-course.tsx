"use client";

type Props = {
	language: string;
};

export default function ContentCourse({language}: Props) {
	return (
		<>
			<span>{language}</span>
			<div>ContentCourse</div>
		</>
	);
}
