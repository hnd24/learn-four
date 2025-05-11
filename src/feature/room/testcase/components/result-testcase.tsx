import {RunCode} from "@/types";
import {useRoom} from "../../provider";

type Props = {};

export default function ResultTestcase({}: Props) {
	const {runCode} = useRoom();
	return (
		<div className="w-full h-full p-4 flex flex-col items-center justify-center">
			{runCode === RunCode.None && (
				<span className="text-zinc-400 font-semibold">You must run your code.</span>
			)}
			{runCode === RunCode.Running && (
				<span className="text-zinc-600 font-semibold ">Loading...</span>
			)}
			{runCode === RunCode.Success && <></>}
		</div>
	);
}
