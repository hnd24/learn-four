import {toast} from 'sonner';

export const uploadFile = (file: File) => {
	const promise = fetch('/api/upload', {
		method: 'POST',
		headers: {
			'content-type': file?.type || 'application/octet-stream',
			'x-vercel-filename': encodeURIComponent(file?.name || 'image.png'),
		},
		body: file,
	});

	return new Promise<string>((resolve, reject) => {
		toast.promise(
			promise.then(async res => {
				if (res.status === 200) {
					const {url} = await res.json();
					resolve(url);
				} else if (res.status === 401) {
					throw new Error('`BLOB_READ_WRITE_TOKEN` not found.');
				} else {
					throw new Error('Error uploading image. Please try again.');
				}
			}),
			{
				loading: 'Uploading image...',
				success: 'Image uploaded successfully.',
				error: e => {
					reject(e);
					return e.message;
				},
			},
		);
	});
};
