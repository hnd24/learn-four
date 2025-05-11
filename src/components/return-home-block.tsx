import Image from "next/image";
import Link from "next/link";
import {Button} from "./ui/button";

export default function ReturnHomeBlock() {
	return (
		<div className="h-[calc(100vh-76px)] w-full flex flex-col items-center justify-center gap-3">
			<Image
				src={`/images/not-found.svg`}
				alt="Logo"
				width={200}
				height={200}
				className="bg-darkDeepBlue rounded-full size-[200px] md:size-[300px] dark:bg-transparent"
			/>
			<div className="text-2xl dark:text-white/90 text-center">Not Found!!!</div>
			<Link href="/">
				<Button className="bg-deepBlue hover:bg-darkDeepBlue  rounded-xl w-32 ">Return Home</Button>
			</Link>
		</div>
	);
}
