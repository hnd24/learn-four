import {del} from '@vercel/blob';
import {NextResponse} from 'next/server';

export async function DELETE(req: Request) {
	const {url} = await req.json();
	if (!process.env.BLOB_READ_WRITE_TOKEN) {
		return new Response(
			"Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
			{
				status: 401,
			},
		);
	}

	try {
		// Lấy file name từ URL để xóa blob
		const fileName = url.split('/').pop();
		if (!fileName) throw new Error('Invalid URL');

		// Thực hiện xóa file
		await del(fileName, {token: process.env.BLOB_READ_WRITE_TOKEN});
		return NextResponse.json({message: 'File deleted successfully'});
	} catch (error: any) {
		return new Response(`Failed to delete file: ${error.message}`, {status: 500});
	}
}
