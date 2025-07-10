import {ArrayContent} from './array-content';
import {PrimitiveContent} from './primitive-content';
import {RowContent} from './row-content';

type Props = {
	value: any;
};

export const JSONContent = ({value}: Props) => {
	if (value == null) {
		<span className="text-gray-500">null</span>;
	}

	if (
		typeof value === 'object' &&
		'value' in value &&
		'color' in value &&
		typeof value.value !== 'object'
	) {
		return <PrimitiveContent value={value.value} color={value.color} />;
	}

	if (Array.isArray(value)) {
		const is2D = Array.isArray(value[0]);
		return <ArrayContent value={value} is2D={is2D} />;
	}

	if (typeof value === 'object' && value !== null) {
		return <RowContent value={value} isObject={true} />;
	}

	return <PrimitiveContent value={value} />;
};
