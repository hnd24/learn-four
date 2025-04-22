"use client";
import {Input} from "@/components/ui/input";
import {useUploadProblem} from "@/hook/use-upload-problem";

export default function SearchNameProblem() {
	const {setConfig} = useUploadProblem();

	return (
		<Input
			type="text"
			onChange={e => {
				setConfig({name: e.target.value.trim()});
			}}
			placeholder="Name"
			className="border-2border-gray-100 shadow-lg"
		/>
	);
}
