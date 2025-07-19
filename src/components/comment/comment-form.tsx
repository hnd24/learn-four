'use client';

import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {useAddComment, useReplyToComment, useUpdateComment} from '@/hook/data/comment';
import {Loader2, Upload} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../convex/_generated/dataModel';

type Props = {
	placeId: string;
	onCancel?: () => void;
	isReply?: boolean;
	isUpdate?: boolean;
};

export default function CommentForm({placeId, onCancel, isReply = false, isUpdate = false}: Props) {
	const [content, setContent] = useState('');
	const {mutate: add, isPending: pendingAdd} = useAddComment();
	const {mutate: reply, isPending: pendingReply} = useReplyToComment();
	const {mutate: update, isPending: pendingUpdate} = useUpdateComment();
	const disabled = pendingAdd || pendingReply || pendingUpdate;
	if (!placeId) {
		return;
	}
	const handleSubmit = () => {
		if (!content.trim()) return;
		if (isUpdate) {
			update(
				{content, commentId: placeId as Id<'comments'>},
				{
					onSuccess: () => {
						toast.success('Comment updated successfully');
						setContent('');
					},
					onError: error => {
						toast.error('Failed to update comment');
						console.error('⚙️ Error updating comment:', error);
					},
				},
			);
			return;
		}
		if (isReply) {
			reply(
				{content, placeId},
				{
					onSuccess: () => {
						toast.success('Reply added successfully');
						setContent('');
					},
					onError: error => {
						toast.error('Failed to add reply');
						console.error('⚙️ Error replying to comment:', error);
					},
				},
			);
			return;
		} else {
			add(
				{content, placeId},
				{
					onSuccess: () => {
						toast.success('Comment added successfully');
						setContent('');
					},
					onError: error => {
						toast.error('Failed to add comment');
						console.error('⚙️ Error adding comment:', error);
					},
				},
			);
			return;
		}
	};
	return (
		<div className="space-y-2 mb-4">
			<Textarea
				className="!bg-muted  min-h-28"
				placeholder={isReply ? 'Write a reply...' : 'Write a comment...'}
				value={content}
				onChange={e => setContent(e.target.value)}
				rows={isReply ? 3 : 4}
				disabled={disabled}
			/>
			<div className="flex justify-end gap-2">
				{onCancel && (
					<Button
						type="button"
						variant="ghost"
						onClick={() => {
							onCancel?.();
							setContent('');
						}}
						disabled={disabled}>
						Cancel
					</Button>
				)}
				<Button onClick={handleSubmit} disabled={disabled}>
					{disabled ? (
						<div className="flex items-center gap-2">
							<Loader2 className="animate-spin" />
							Loading...
						</div>
					) : (
						<div className="flex items-center gap-2">
							<Upload />
							{isReply ? 'Reply' : isUpdate ? 'Update' : 'Post'}
						</div>
					)}
				</Button>
			</div>
		</div>
	);
}
