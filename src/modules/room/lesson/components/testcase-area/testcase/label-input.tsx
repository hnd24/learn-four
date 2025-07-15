import {useState} from 'react';

type Props = {
	value: string;
	onChange: (value: string) => void;
	editable?: boolean;
};

export const LabelInput = ({value, onChange, editable = true}: Props) => {
	const [editing, setEditing] = useState(false);

	const [text, setText] = useState(value);

	const onChangeText = (newText: string) => {
		onChange(newText.trim());
		setEditing(false);
	};

	if (editable && editing) {
		return (
			<input
				autoFocus
				value={text}
				onChange={e => setText(e.target.value)}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						onChangeText(text);
					} else if (e.key === 'Escape') {
						setEditing(false);
						setText(value);
					}
				}}
				onBlur={() => {
					onChangeText(text);
				}}
				onFocus={e => e.target.select()}
				className="text-muted-foreground border border-transparent bg-transparent px-2 py-1 text-xs font-medium focus:border-blue-500 focus:outline-none"
			/>
		);
	}
	return (
		<span
			className="text-muted-foreground cursor-text pr-4 text-xs font-medium"
			onClick={() => setEditing(true)}>
			{value} =
		</span>
	);
};
