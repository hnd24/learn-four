import Image from 'next/image';

export default function CostumeLoadingPage() {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<Image
				src={`/images/loading.svg`}
				alt="Logo"
				width={300}
				height={300}
				className="animate-pulse duration-2000"
			/>
		</div>
	);
}
