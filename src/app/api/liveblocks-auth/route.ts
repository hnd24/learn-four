import { convex } from "@/lib/convex";
import { liveblocks } from "@/lib/liveblocks";
import { getUserInfo } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";
import { Role } from "../../../../convex/documents";

export async function POST(request: Request) {
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { getToken } = await auth();
    const token = await getToken({ template: "convex" });

    convex.setAuth(token!);

    const { room } = await request.json();
    const document = await convex.query(api.documents.get, { id: room });

    const { id, ...userInfo } = getUserInfo(user);
    const session = liveblocks.prepareSession(user.id, { userInfo });

    if (document.role === Role.Admin && document.type !== "published") {
        session.allow(room, session.FULL_ACCESS);
    } else {
        session.allow(room, session.READ_ACCESS);
    }

    const { status, body } = await session.authorize();

    return new Response(body, { status });
}
