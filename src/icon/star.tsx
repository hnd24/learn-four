import {cn} from "@/lib/utils";

type Props = {
	className?: string;
};

export const StarFillIcon = ({className}: Props) => {
	return (
		<div className="">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 576 512"
				className={cn("size-4 fill-amber-400", className)}>
				<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
			</svg>
		</div>
	);
};

export const StarHalfIcon = ({className}: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className={cn("size-4 fill-amber-400", className)}
			viewBox="0 0 16 16">
			<path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
		</svg>
	);
};

export const StarIcon = ({className}: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className={cn("size-4 fill-amber-400", className)}
			viewBox="0 0 16 16">
			<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
		</svg>
	);
};

export function OneStar({className}: Props) {
	return <StarFillIcon className={className} />;
}

export function TwoStar({className}: Props) {
	const numberStar = Array.from({length: 2}, (_, i) => i);
	return (
		<div className={cn("flex gap-1", className)}>
			{numberStar.map((_, index) => (
				<StarFillIcon key={index} />
			))}
		</div>
	);
}

export function ThreeStar({className}: Props) {
	const numberStar = Array.from({length: 3}, (_, i) => i);
	return (
		<div className={cn("flex gap-1", className)}>
			{numberStar.map((_, index) => (
				<StarFillIcon key={index} />
			))}
		</div>
	);
}
export function FourStar({className}: Props) {
	const numberStar = Array.from({length: 4}, (_, i) => i);
	return (
		<div className={cn("flex gap-1", className)}>
			{numberStar.map((_, index) => (
				<StarFillIcon key={index} />
			))}
		</div>
	);
}

export function FiveStar({className}: Props) {
	const numberStar = Array.from({length: 5}, (_, i) => i);
	return (
		<div className={cn("flex gap-1", className)}>
			{numberStar.map((_, index) => (
				<StarFillIcon key={index} />
			))}
		</div>
	);
}
