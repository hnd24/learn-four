'use client';

import {useMounted} from '@/hook/use-mounted';

type Props = {
	children: React.ReactNode;
};

export const ClientOnly = ({children}: Props) => {
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	return children;
};
