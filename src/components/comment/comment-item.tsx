'use client';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {DEFAULT_LOGO_URL, NUMBER_COMMENTS_PER_LOAD} from '@/constants';
import {
	useDeleteComment,
	useGetCommentsByPlaceId,
	useToggleDislike,
	useToggleLike,
} from '@/hook/data/comment';
import {cn, formatDate} from '@/lib/utils';
import {CommentType} from '@/types';
import {Trash2} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../convex/_generated/dataModel';
import CommentForm from './comment-form';

type Props = {
	comment: CommentType;
	currentUserId: string;
	placeId: Id<'comments'>;
	isAdmin?: boolean;
};

export default function CommentItem({comment, currentUserId, placeId, isAdmin = false}: Props) {
	const {results: comments, isLoading, status, loadMore} = useGetCommentsByPlaceId(placeId);
	const {mutate: like, isPending: pendingLike} = useToggleLike();
	const {mutate: dislike, isPending: pendingDislike} = useToggleDislike();
	const {mutate: deleteComment, isPending: isDeleting} = useDeleteComment();
	const [showReplyForm, setShowReplyForm] = useState(false);
	const isLiked = comment.likes?.includes(currentUserId);
	const isDisliked = comment.dislikes?.includes(currentUserId);
	const isLoadMore = status === 'CanLoadMore';
	const userComment = comment.user!;
	const handleDelete = () => {
		deleteComment(
			{
				commentId: comment._id,
			},
			{
				onSuccess: () => {
					toast.success('Comment deleted successfully');
				},
				onError: error => {
					toast.error(`Failed to delete comment`);
					console.error('⚙️ Failed to delete comment:', error);
				},
			},
		);
	};
	const handleLike = () => {
		like(
			{
				commentId: comment._id,
			},
			{
				onError: error => {
					toast.error(`Failed to like comment`);
					console.error('⚙️ Failed to like comment:', error);
				},
			},
		);
	};
	const handleDislike = () => {
		dislike(
			{
				commentId: comment._id,
			},
			{
				onError: error => {
					toast.error(`Failed to dislike comment`);
					console.error('⚙️ Failed to dislike comment:', error);
				},
			},
		);
	};

	return (
		<div className="flex items-start space-x-3 mb-4">
			<Avatar className="w-9 h-9">
				<AvatarImage
					className="object-cover"
					src={`${userComment.image || DEFAULT_LOGO_URL}`}
				/>
				<AvatarFallback>{userComment.name.charAt(0).toUpperCase() || 'H'}</AvatarFallback>
			</Avatar>
			<div className="flex-1">
				<div className="bg-muted rounded-xl px-3 py-2 ">
					<div className="font-semibold text-sm">{userComment.name}</div>
					<p className="mt-0.5 text-sm">{comment.content}</p>
				</div>
				<div className="mt-1 flex items-center space-x-3 text-xs  ml-2">
					<Button
						variant="link"
						size="sm"
						onClick={() => {
							handleLike();
						}}
						disabled={pendingLike}>
						{comment.likes?.length || 0}{' '}
						<p className={cn(isLiked && 'text-blue-500')}>Like</p>
					</Button>
					<Button
						variant="link"
						size="sm"
						onClick={() => {
							handleDislike();
						}}
						disabled={pendingDislike}>
						{comment.dislikes?.length || 0}{' '}
						<p className={cn(isDisliked && 'text-blue-500')}>Dislike</p>
					</Button>
					<Button
						variant="link"
						size="sm"
						onClick={() => setShowReplyForm(!showReplyForm)}>
						Reply
					</Button>

					<span>{formatDate(comment._creationTime)}</span>

					{(isAdmin || userComment.userId === currentUserId) && (
						<div className="ml-auto flex gap-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleDelete}
								disabled={isDeleting}
								className="p-0 h-auto  hover:text-red-400 ">
								<Trash2 className="h-3 w-3" />
							</Button>
						</div>
					)}
				</div>

				{showReplyForm && (
					<div className="mt-2 ml-2">
						<CommentForm
							placeId={placeId}
							isReply
							onCancel={() => setShowReplyForm(false)}
						/>
					</div>
				)}

				{/* Display Replies */}
				{comments && (
					<div className="mt-2 relative pl-6 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-muted">
						{comments.map(reply => (
							<CommentItem
								key={reply._id}
								comment={reply}
								currentUserId={currentUserId}
								placeId={reply._id}
							/>
						))}
						{isLoadMore && (
							<Button
								variant="link"
								onClick={() => {
									loadMore(NUMBER_COMMENTS_PER_LOAD);
								}}
								className="mt-2 ml-2 p-0 h-auto text-blue-400 hover:text-blue-300"
								disabled={isLoading}>
								{isLoadMore ? 'Loading...' : `Load more `}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
