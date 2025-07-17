import { createImageUpload } from "novel";
import { toast } from "sonner";

const onUpload = (file: File) => {
    const promise = fetch("/api/upload", {
        method: "POST",
        headers: {
            "content-type": file?.type || "application/octet-stream",
            "x-vercel-filename": encodeURIComponent(file?.name || "image.png"),
        },
        body: file,
    });
    console.log("🚀 ~ onUpload ~ promise:", promise);

    return new Promise((resolve, reject) => {
        toast.promise(
            promise.then(async (res) => {
                if (res.status === 200) {
                    const { url } = (await res.json()) as { url: string };
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {
                        resolve(url);
                    };
                } else if (res.status === 401) {
                    resolve(file);
                    throw new Error(
                        "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.",
                    );
                } else {
                    throw new Error("Error uploading image. Please try again.");
                }
            }),
            {
                loading: "Uploading image...",
                success: "Image uploaded successfully.",
                error: (e) => {
                    reject(e);
                    return e.message;
                },
            },
        );
    });
};

export const uploadImageFn = createImageUpload({
    onUpload,
    validateFn: (file) => {
        if (!file.type.includes("image/")) {
            toast.error("File type not supported.");
            return false;
        }

        return true;
    },
});
