import {useRoomStore} from "./provider";

export const useRoom = () => {
	const store = useRoomStore(state => state);
	return store;
};
