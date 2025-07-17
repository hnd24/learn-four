'use client';

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {Separator} from '@/components/ui/separator';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

import Canvas from '@/modules/admin/components/canvas';
import {TabValue} from '@/types';
import {useAtomValue} from 'jotai';
import {CodeXml, Palette} from 'lucide-react';
import {useState} from 'react';
import {statusProblemAtom} from '../../atom/status';
import TestcaseArea from '../testcase-area';
import {CodeEditor} from './code-editor';

export default function CodeArea() {
	const [activeTab, setActiveTab] = useState<TabValue>(TabValue.Editor);
	const status = useAtomValue(statusProblemAtom);
	const isPublished = status === 'public';
	return (
		<Tabs
			value={activeTab}
			onValueChange={value => setActiveTab(value as TabValue)}
			className="h-full gap-0 overflow-hidden rounded-md">
			<div className="bg-accent flex h-10 shrink-0 items-center justify-between rounded-t-md border border-b-0 px-2">
				<TabsList>
					<TabsTrigger value={TabValue.Editor}>
						<CodeXml className="text-green-500" />
						Code
					</TabsTrigger>
					<Separator orientation="vertical" className="mx-1 !h-4/5" />
					<TabsTrigger value={TabValue.Canvas}>
						<Palette className="text-blue-500" />
						Canvas
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent
				value={TabValue.Editor}
				className="h-full p-0 data-[state=active]:flex data-[state=active]:flex-col">
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={60} minSize={20}>
						<CodeEditor />
					</ResizablePanel>

					<ResizableHandle withHandle className="my-2" />

					<ResizablePanel defaultSize={40} minSize={20}>
						<TestcaseArea />
					</ResizablePanel>
				</ResizablePanelGroup>
			</TabsContent>
			<TabsContent value={TabValue.Canvas}>
				<Canvas isPublished={isPublished} />
			</TabsContent>
		</Tabs>
	);
}
