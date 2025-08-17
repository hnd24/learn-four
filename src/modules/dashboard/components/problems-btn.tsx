import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import Link from 'next/link';

export default function ProblemBtn() {
	return (
		<Link href="/problem">
			<Button size="lg" className="h-11 px-8">
				Get Started
				<ArrowRight className="ml-2 h-4 w-4" />
			</Button>
		</Link>
	);
}
