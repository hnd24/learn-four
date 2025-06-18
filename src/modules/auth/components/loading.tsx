import {Loader} from "lucide-react";

type Props = {
	label?: string;
};

export const FullscreenLoader = ({label}: Props) => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-2">
			<Loader className="text-muted-foreground size-6 animate-spin" />
			{label && <p className="text-muted-foreground text-sm">{label}</p>}
		</div>
	);
};
