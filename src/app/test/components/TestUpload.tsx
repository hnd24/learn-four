'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {deleteFile} from '@/lib/delete-file';
import {uploadFile} from '@/lib/upload-file';
import {useState} from 'react';
import {toast} from 'sonner';

export default function TestUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const handleUpload = async () => {
		if (file) {
			setIsUploading(true);
			try {
				const url = await uploadFile(file);
				setImageUrl(url); // Lưu URL ảnh sau khi upload thành công
				toast.success('Image uploaded successfully!');
			} catch (error) {
				toast.error('Error uploading image. Please try again.');
			} finally {
				setIsUploading(false);
			}
		}
	};

	const handleDelete = async () => {
		if (imageUrl) {
			setIsDeleting(true);
			try {
				await deleteFile(imageUrl);
				setImageUrl(null); // Xóa URL ảnh sau khi xóa thành công
				toast.success('Image deleted successfully!');
			} catch (error) {
				toast.error('Error deleting image. Please try again.');
			} finally {
				setIsDeleting(false);
			}
		}
	};

	return (
		<div className="space-y-4 max-w-md mx-auto mt-10">
			{/* Input file */}
			<Input
				type="file"
				accept="image/*"
				onChange={e => {
					if (e.target.files?.[0]) setFile(e.target.files[0]);
				}}
			/>

			{/* Upload Button */}
			<Button onClick={handleUpload} disabled={!file || isUploading}>
				{isUploading ? 'Uploading...' : 'Upload'}
			</Button>

			{/* Image preview */}
			{imageUrl && (
				<div className="mt-4">
					<p className="text-sm text-muted-foreground">Uploaded Image:</p>
					<img src={imageUrl} alt="Uploaded" className="mt-2 rounded-lg" />
					<Button className="mt-2" onClick={handleDelete} disabled={isDeleting}>
						{isDeleting ? 'Deleting...' : 'Delete Image'}
					</Button>
				</div>
			)}
		</div>
	);
}
