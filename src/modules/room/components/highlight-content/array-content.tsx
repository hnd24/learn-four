import {RowContent} from './row-content';

type Props = {
	value: any[];
	is2D?: boolean;
};

export const ArrayContent = ({value, is2D}: Props) => {
	if (is2D) {
		return (
			<div className="text-sm whitespace-pre">
				[
				{value.map((row: any[], rowIndex: number) => (
					<div key={rowIndex} className="pl-4">
						<RowContent value={row} />
					</div>
				))}
				]
			</div>
		);
	}
	return <RowContent value={value} />;
};
