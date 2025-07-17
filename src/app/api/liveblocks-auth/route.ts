import {convex} from '@/lib/convex';
import {liveblocks} from '@/lib/liveblocks';
import {getUserInfo} from '@/lib/utils';
import {auth, currentUser} from '@clerk/nextjs/server';
import {api} from '../../../../convex/_generated/api';

export async function POST(request: Request) {
	const user = await currentUser();
	if (!user) {
		return new Response('Unauthorized', {status: 401});
	}

	const {getToken} = await auth();
	const token = await getToken({template: 'convex'});

	convex.setAuth(token!);

	const {problemId = '', lessonId = ''} = await request.json();
	const {id, ...userInfo} = getUserInfo(user);
	const session = liveblocks.prepareSession(`user-${user.id}`, {userInfo});

	let statusRoom: 'public' | 'private' = 'private';
	const roomId = (problemId || lessonId || 'default-room') as string;

	if (problemId) {
		const problem = await convex.query(api.problems.getDetailProblemById, {problemId});
		statusRoom = problem.status;
	}
	if (lessonId) {
		const lesson = await convex.query(api.lessons.getLessonById, {lessonId});
		statusRoom = lesson.status;
	}

	if (statusRoom === 'private') {
		session.allow(roomId, session.FULL_ACCESS);
	} else {
		session.allow(roomId, session.READ_ACCESS);
	}

	const {status, body} = await session.authorize();

	return new Response(body, {status});
}
