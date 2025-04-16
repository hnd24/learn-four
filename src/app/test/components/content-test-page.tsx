"use client";
import {Button} from "@/components/ui/button";
import {useCounterStore} from "@/providers/counter-store-provider";

export default function ContentTestPage() {
	const {count, incrementCount, decrementCount} = useCounterStore(state => state);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			Count: {count}
			<hr />
			<Button type="button" onClick={incrementCount}>
				Increment Count
			</Button>
			<Button type="button" onClick={decrementCount}>
				Decrement Count
			</Button>
		</div>
	);
}
