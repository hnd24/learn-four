import Image from 'next/image';

export default function LoadingPage() {
	return (
		<div
			className="h-screen 
      w-full flex flex-col justify-center items-center">
			<Image
				src={`/images/loading.svg`}
				alt="Logo"
				width={288}
				height={288}
				className="animate-pulse duration-2000 bg-white p-2 rounded-full"
			/>
		</div>
	);
}
