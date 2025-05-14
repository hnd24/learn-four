"use client";

import ContentRoom from "./content/content-room";
import {DashboardProvider} from "./provider";

type Props = {
	id: string;
};

export default function ModuleRoom({id}: Props) {
	return (
		<DashboardProvider>
			<ContentRoom id={id} />
		</DashboardProvider>
	);
}
