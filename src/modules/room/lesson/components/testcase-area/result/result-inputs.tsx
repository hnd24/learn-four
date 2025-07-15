import {ButtonCopy} from '@/components/button-copy';
import {firaCode} from '@/lib/font';
import {cn} from '@/lib/utils';

type Props = {
	values: {label: string; value: string}[];
};

export default function ResultInputs({values}: Props) {
	return (
		<div>
			<h3 className="text-muted-foreground mb-2 text-base font-medium">Input</h3>
			<div className="space-y-2">
				{values.map((input, index) => (
					<div
						key={index}
						className="shadow bg-border group relative space-y-2 rounded-md p-3">
						<div className=" text-muted-foreground text-xs">{input.label} =</div>

						<ButtonCopy
							value={input.value}
							className="invisible absolute top-2 right-2 group-hover:visible"
						/>
						<div className={cn(' text-sm break-all', firaCode.className)}>
							{input.value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
