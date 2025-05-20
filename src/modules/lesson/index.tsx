"use client";

import ContentRoom from "./content/content-room";
import {RoomStoreProvider} from "./provider/provider";

type Props = {
	id: string;
};

export default function ModuleRoom({id}: Props) {
	return (
		<RoomStoreProvider>
			<ContentRoom id={id} />
		</RoomStoreProvider>
	);
}
