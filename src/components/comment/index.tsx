'use client';
import {ScrollArea} from '@/components/ui/scroll-area';
import {NUMBER_COMMENTS_PER_LOAD} from '@/constants';
import {useCheckAdmin} from '@/hook/data/admin';
import {useGetCommentsByPlaceId} from '@/hook/data/comment';
import {useUser} from '@clerk/nextjs';
import {Button} from '../ui/button';
import CommentForm from './comment-form';
import CommentItem from './comment-item';

type Props = {
	placeId: string;
};

export default function Comment({placeId}: Props) {
	const {user, isSignedIn} = useUser();
	const {data: isAdmin, isPending: loading} = useCheckAdmin();
	const {results: comments, isLoading, status, loadMore} = useGetCommentsByPlaceId(placeId);

	const isLoadMore = status === 'CanLoadMore';
	if (!isSignedIn || !user || loading) {
		return <div className="size-full">loading...</div>;
	}
	return (
		<div className="h-[calc(100vh-110px)] overflow-y-auto">
			<ScrollArea className="overflow-y-auto size-full p-4 flex flex-col items-center justify-start ">
				<CommentForm placeId={placeId} />
				{isLoading && comments.length === 0 && (
					<div className="text-center text-gray-500">Loading comments...</div>
				)}
				<div className="space-y-4">
					{comments.map(comment => (
						<CommentItem
							key={comment._id}
							comment={comment}
							currentUserId={user.id}
							placeId={comment._id}
							isAdmin={isAdmin}
						/>
					))}
				</div>
				{isLoadMore && (
					<Button
						variant="link"
						onClick={() => {
							loadMore(NUMBER_COMMENTS_PER_LOAD);
						}}
						className="mt-2"
						disabled={isLoading}>
						{isLoading ? 'Loading...' : `Load more`}
					</Button>
				)}
			</ScrollArea>
		</div>
	);
}
