import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" })

export const ourFileRouter = {
    fileUploader: f(["pdf", "text", "image"])
        .middleware(async ({ req }) => {
            const user = await auth(req)

            if (!user) {
                return { status: 401, body: "Unauthorized" }
            }

            return { userId: user.id }
        })
        .onUploadComplete(async ({ file, metadata }) => {
            console.log("Upload complete for user", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId}
        }),
} satisfies FileRouter;

export type ourFileRouter = typeof ourFileRouter;