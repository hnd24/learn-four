'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useGetTopics} from '@/hook/data/topic';
import {TopicType} from '@/types/topic';
import {useEffect, useState} from 'react';
import {useFilter} from '../hook/use-filters';

export default function SelectTopic() {
	const {
		filter: {topic},
		setFilter,
	} = useFilter();
	const {getTopic, loading} = useGetTopics();
	const [topics, setTopics] = useState<TopicType[] | undefined>(undefined);
	useEffect(() => {
		const fetchTopics = async () => {
			const topics = await getTopic();
			if (topics) {
				setTopics(topics as TopicType[]);
			}
		};
		fetchTopics();
	}, [getTopic]);
	if (loading || !topics) {
		<div className="min-w-64 h-9 px-4 border rounded-lg flex items-center text-sm text-muted-foreground">
			Loading...
		</div>;
	}
	return (
		<Select defaultValue={topic} onValueChange={value => setFilter({topic: value})}>
			<SelectTrigger className="w-full md:min-w-40 xl:md:min-w-64">
				<SelectValue placeholder="Topic" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={'all'}>All</SelectItem>
				{topics &&
					topics.map((topic: TopicType) => (
						<SelectItem key={topic._id} value={topic._id}>
							{topic.name}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
}
