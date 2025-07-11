import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return new Response(
            "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
            {
                status: 401,
            },
        );
    }

    const file = req.body || "";
    const filename = req.headers.get("x-vercel-filename") || "file";
    const contentType =
        req.headers.get("content-type") || "application/octet-stream";
    const ext = `.${contentType.split("/")[1] || "bin"}`;

    const finalName = `${filename.replace(/\.[^/.]+$/, "")}-${nanoid()}${ext}`;

    const blob = await put(finalName, file, {
        contentType,
        access: "public",
        allowOverwrite: false,
    });

    return NextResponse.json(blob);
}
