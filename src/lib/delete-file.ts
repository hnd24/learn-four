import {toast} from 'sonner';

export const deleteFile = (fileUrl: string) => {
	const promise = fetch('/api/delete', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({url: fileUrl}), // Gửi URL của file cần xóa
	});

	return new Promise<void>((resolve, reject) => {
		toast.promise(
			promise.then(async res => {
				if (res.status === 200) {
					await res.json(); // Chỉ cần kiểm tra response thành công
					resolve();
				} else if (res.status === 401) {
					throw new Error('`BLOB_READ_WRITE_TOKEN` not found.');
				} else {
					throw new Error('Error deleting image. Please try again.');
				}
			}),
			{
				loading: 'Deleting image...',
				success: 'Image deleted successfully.',
				error: e => {
					reject(e);
					return e.message;
				},
			},
		);
	});
};
