import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link href={"/"} className="flex items-center justify-center h-full cursor-pointer">
			<Image src="/logo.ico" alt="logo" width={50} height={50} className="rounded-full" />
			<div
				className=" uppercase text-xl flex flex-col justify-center w-20 relative
        font-bold text-pulseBlue leading-5 tracking-wide">
				<span className="text-start ">Learn</span>
				<span className="text-end">Four</span>
				<span className=" absolute -bottom-1.5 bg-pulseBlue w-full h-0.5 rounded-full" />
			</div>
		</Link>
	);
}
