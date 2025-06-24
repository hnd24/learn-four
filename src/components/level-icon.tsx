import {AllLevelIcon, EasyLevelIcon, HardLevelIcon, MediumLevelIcon} from '@/icon/difficuly-icon';

type Props = {
	className?: string;
	level: string;
};

export const LevelIcon = ({level, className}: Props) => {
	switch (level) {
		case 'easy':
			return <EasyLevelIcon className={className} />;
		case 'medium':
			return <MediumLevelIcon className={className} />;
		case 'hard':
			return <HardLevelIcon className={className} />;
		case 'all':
			return <AllLevelIcon className={className} />;
		default:
			return <AllLevelIcon className={className} />;
	}
};
