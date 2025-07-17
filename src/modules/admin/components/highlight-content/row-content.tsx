import {firaCode} from '@/lib/font';
import {JSONContent} from './json-content';

type Props = {
	value: any;
	isObject?: boolean;
};

export const RowContent = ({value, isObject = false}: Props) => {
	const [openChar, closeChar] = isObject ? ['{', '}'] : ['[', ']'];
	const entries = isObject ? Object.entries(value) : value;

	return (
		<span>
			{openChar}
			{entries.map((item: any, idx: number) => (
				<span key={idx} className={firaCode.className}>
					<span>{isObject && `"${item.key}"`}</span>
					<JSONContent value={item} />
					{idx < value.length - 1 && <span>, </span>}
				</span>
			))}
			{closeChar}
		</span>
	);
};
