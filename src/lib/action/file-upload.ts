import {toast} from 'sonner';

export const uploadFileFn = async (file: File) => {
	const promise = fetch('/api/upload', {
		method: 'POST',
		headers: {
			'content-type': file?.type || 'application/octet-stream',
			'x-vercel-filename': encodeURIComponent(file?.name || 'file'),
		},
		body: file,
	});

	return new Promise((resolve, reject) => {
		toast.promise(
			promise.then(async res => {
				if (res.status === 200) {
					const {url} = (await res.json()) as {url: string};
					resolve(url);
				} else if (res.status === 401) {
					resolve(file);
					throw new Error(
						'`BLOB_READ_WRITE_TOKEN` environment variable not found, reading file locally instead.',
					);
				} else {
					throw new Error('Error uploading file. Please try again.');
				}
			}),
			{
				loading: 'Uploading file...',
				success: 'File uploaded successfully.',
				error: e => {
					reject(e);
					return e.message;
				},
			},
		);
	});
};
