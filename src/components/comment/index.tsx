'use client';
import {ScrollArea} from '@/components/ui/scroll-area';
import {NUMBER_COMMENTS_PER_LOAD} from '@/constants';
import {useCheckAdmin} from '@/hook/data/admin';
import {useGetCommentsByPlaceId} from '@/hook/data/comment';
import {useUser} from '@clerk/nextjs';
import {Button} from '../ui/button';
import {Skeleton} from '../ui/skeleton';
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
		return <CommentsSkeleton />;
	}
	const range = Array.from({length: NUMBER_COMMENTS_PER_LOAD}, (_, i) => i);
	return (
		<div className="h-[calc(100vh-110px)] overflow-y-auto">
			<ScrollArea className="overflow-y-auto size-full p-4 flex flex-col items-center justify-start ">
				<CommentForm placeId={placeId} />

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
				{isLoading && range.map(i => <CommentSkeleton key={i} />)}
				{isLoadMore && (
					<Button
						variant="link"
						onClick={() => {
							loadMore(NUMBER_COMMENTS_PER_LOAD);
						}}
						className="mt-2"
						disabled={isLoading}>
						{isLoading ? 'Loading...' : `Load More...`}
					</Button>
				)}
			</ScrollArea>
		</div>
	);
}

function CommentsSkeleton() {
	const range = Array.from({length: 5}, (_, i) => i);
	return (
		<ScrollArea className="h-[calc(100vh-110px)] w-full  flex flex-col overflow-y-auto p-4">
			<Skeleton className="h-32 rounded-md w-full mb-4" />
			<Skeleton className="ml-auto h-10 w-22  mb-4" />
			{range.map(i => (
				<CommentSkeleton key={i} />
			))}
		</ScrollArea>
	);
}

function CommentSkeleton() {
	return (
		<div className="w-full flex items-start mb-4 gap-3">
			<Skeleton className="size-10 rounded-full" />
			<Skeleton className=" flex-1 h-20 rounded-md" />
		</div>
	);
}
