"use client";

import clsx from "clsx";
import {useEffect, useRef, useState} from "react";

const sections = [
	{id: "section1", label: "Giới thiệu"},
	{id: "section2", label: "Nội dung chính"},
	{id: "section3", label: "Kết luận"},
];

export default function Page() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: "0px 0px -70% 0px", // kích hoạt sớm hơn 70% chiều cao
				threshold: 0.1,
			},
		);

		sections.forEach(section => {
			const el = document.getElementById(section.id);
			if (el) {
				sectionRefs.current[section.id] = el;
				observer.observe(el);
			}
		});

		return () => {
			Object.values(sectionRefs.current).forEach(el => {
				if (el) observer.unobserve(el);
			});
		};
	}, []);

	return (
		<div className="flex">
			{/* Sidebar */}
			<nav className="sticky top-0 h-screen w-52 p-4 space-y-2 bg-gray-100">
				{sections.map(s => (
					<a
						key={s.id}
						href={`#${s.id}`}
						className={clsx(
							"block px-2 py-1 rounded transition",
							activeId === s.id ? "bg-blue-500 text-white" : "text-gray-700",
						)}>
						{s.label}
					</a>
				))}
			</nav>

			{/* Content */}
			<main className="p-8 space-y-32">
				{sections.map(s => (
					<section key={s.id} id={s.id} className="scroll-mt-24 h-screen">
						<h2 className="text-2xl font-bold mb-4">{s.label}</h2>
						<p className="text-gray-600">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisi id eros
							euismod finibus...
						</p>
					</section>
				))}
			</main>
		</div>
	);
}
