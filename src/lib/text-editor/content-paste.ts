import {type EditorView} from '@tiptap/pm/view';
import {marked} from 'marked';
import {handleImagePaste} from 'novel';
import {DOMParser as PMDOMParser} from 'prosemirror-model';
import {uploadImageFn} from '../action/image-upload';

export const onPaste = (view: EditorView, event: ClipboardEvent) => {
	const hasImage = handleImagePaste(view, event, uploadImageFn);

	if (hasImage) {
		return true;
	}

	const clipboard = event.clipboardData;

	if (!clipboard) {
		return false;
	}

	const text = clipboard.getData('text/plain');
	if (!text) {
		return false;
	}

	const {state} = view;
	const parentNode = state.selection.$from.parent;

	if (parentNode.type.name === 'codeBlock') {
		const tr = state.tr.insertText(text, state.selection.from, state.selection.to);
		view.dispatch(tr);
		return true;
	}

	const isMarkdown = text.includes('#') || text.includes('**') || text.includes('```');

	if (isMarkdown) {
		const html = marked.parse(text, {
			async: false,
			breaks: true,
			gfm: true,
		});

		const temp = document.createElement('div');
		temp.innerHTML = html;

		const slice = PMDOMParser.fromSchema(state.schema).parse(temp);
		const tr = state.tr.replaceSelectionWith(slice, false);
		view.dispatch(tr);
		return true;
	}
	return false;
};
