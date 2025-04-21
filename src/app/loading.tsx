import Image from "next/image";

export default function LoadingPage() {
	return (
		<div
			className="h-screen bg-blackLight
      w-full flex flex-col justify-center items-center">
			<Image
				src={`/images/loading.svg`}
				alt="Logo"
				width={300}
				height={300}
				className="animate-pulse duration-1000"
			/>
		</div>
	);
}
