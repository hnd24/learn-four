import {Logo} from '@/components/logo';
import SwitchTheme from '@/components/switch-theme';
import AdminBtn from '@/modules/dashboard/components/admin-btn';
import ListCourseCard from '@/modules/dashboard/components/list-course-card';
import {Navbar} from '@/modules/dashboard/components/navbar';
import ProblemBtn from '@/modules/dashboard/components/problems-btn';
import {SignInBtn} from '@/modules/dashboard/components/sign-in-btn';
import Link from 'next/link';

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
				<div className="mx-auto flex h-14 max-w-6xl items-center px-4 md:px-8">
					<div className="mr-4 hidden md:flex">
						<Logo />
					</div>
					<Navbar />
					{/* TODO: switch admin mode */}
					<div className="flex flex-1 items-center justify-end space-x-1">
						<AdminBtn />
						<SwitchTheme className="size-9 rounded-full border-2" />
						<SignInBtn />
					</div>
				</div>
			</header>
			<main>
				{/* introduction */}
				<section
					className="lg:min-h-[calc(100vh-56px)] space-y-6 flex flex-col justify-center items-center 
          pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
					<div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center ">
						<div className="rounded-full bg-gradient-to-r from-darkOceanBlue to-darkLeafyGreen px-3 py-1 text-sm text-white">
							🌱 Learn, practice, and grow your programming skills
						</div>
						<h1 className="font-heading text-2xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
							Level Up <br />
							Your Programming Skills <br />
						</h1>
						<div className="bg-gradient-to-r from-darkOceanBlue to-darkLeafyGreen bg-clip-text text-transparent">
							<h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-8xl">
								LearnFour
							</h1>
						</div>
						<p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
							LearnFour is a modern platform designed for IT students to strengthen
							programming and algorithmic thinking through structured lessons, coding
							challenges, and real-time code execution in multiple languages.
						</p>
					</div>
				</section>
				{/* courses */}
				<section
					id="courses"
					className="lg:min-h-[calc(100vh-56px)] space-y-6 flex flex-col justify-center items-center
            px-4 py-8 md:px-8 md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 px-4 text-center">
						<h2 className="font-heading text-2xl leading-[1.1] font-bold sm:text-3xl md:text-6xl">
							Language Programming Courses
						</h2>
						<p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
							Master programming languages by completing structured, beginner-friendly
							courses that guide you step by step from fundamental concepts to
							practical applications, helping you build a solid foundation and
							confidence in real-world coding
						</p>
					</div>
					<ListCourseCard />
				</section>
				{/* Problems */}
				<section
					id="problems"
					className="lg:min-h-[calc(100vh-152px)] space-y-6 flex flex-col justify-center items-center
          px-4 py-8 md:px-8 md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
						<h2 className="font-heading text-2xl leading-[1.1] font-bold sm:text-3xl md:text-6xl">
							😎 Sharpen 😎
							<br /> Your Problem - Solving Skills <br />✨ Coding Challenges 🎖️
						</h2>
						<p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
							Join thousands of learners who are sharpening their coding skills and
							mastering algorithms through hands-on challenges on LearnFour.
						</p>
						<div className="space-x-4">
							<ProblemBtn />
						</div>
					</div>
				</section>
			</main>
			<footer className="border-t py-6 md:py-0">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row md:px-8">
					<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
						<p className="hidden md:flex text-muted-foreground text-center text-sm leading-loose md:text-left">
							© 2025 LearnFour. Empowering the next generation of developers.
						</p>
						<div className="flex space-x-4 mt-2 md:mt-0">
							<Link
								href="/about"
								className="hover:underline text-muted-foreground text-sm">
								About
							</Link>
							<Link
								href="/contact"
								className="hover:underline text-muted-foreground text-sm">
								Contact
							</Link>
							<Link
								href="/privacy"
								className="hover:underline text-muted-foreground text-sm">
								Privacy Policy
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
