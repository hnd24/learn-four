'use client';
import {CheckIcon, ChevronsUpDownIcon, Plus} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useGetTopics} from '@/hook/data/topic';
import {cn} from '@/lib/utils';
import {useState} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import CreateTopicBtn from './create-topic-btn';

type Props = {
	value: Id<'topics'>;
	onChange: (value: Id<'topics'>) => void;
};

export default function TopicSelection({value, onChange}: Props) {
	const {data: topics, loading} = useGetTopics();
	const [open, setOpen] = useState(false);
	const [creating, setCreating] = useState(false);

	if (loading) {
		return <Input disabled value="Loading topics..." className="w-full" />;
	}
	if (!topics || topics.length === 0 || creating) {
		return <CreateTopicBtn onChange={onChange} onClose={() => setCreating(false)} />;
	}
	const onFilter = (value: string, search: string) => {
		const topicName = topics.find(topic => topic?._id === value)?.name.toLowerCase();

		const isMatch = topicName?.includes(search.toLowerCase());

		return isMatch ? 1 : 0;
	};
	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between capitalize">
					{value ? topics.find(topic => topic._id === value)?.name : 'Select topic'}
					<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 sm:min-w-[464px]">
				<Command filter={onFilter}>
					<CommandInput placeholder="Search topic..." />
					<CommandList>
						<CommandEmpty>No topic found.</CommandEmpty>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setCreating(true);
									setOpen(false);
								}}
								className="text-muted-foreground">
								<Plus className="mr-2 h-4 w-4" />
								Add new topic
							</CommandItem>
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup>
							{topics.map(topic => (
								<CommandItem
									key={topic._id}
									value={topic._id}
									className="capitalize"
									onSelect={currentValue => {
										if (currentValue !== (value as string)) {
											onChange(currentValue as Id<'topics'>);
										}
										setOpen(false);
									}}>
									<CheckIcon
										className={cn(
											'mr-2 h-4 w-4',
											value === topic._id ? 'opacity-100' : 'opacity-0',
										)}
									/>
									{topic.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
