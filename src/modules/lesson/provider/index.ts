// index.ts
import {useContext} from "react";
import {Context, RoomContextProps} from "./context";
export {default as DashboardProvider} from "./provider";

export const useRoom = (): RoomContextProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useRoom must be used within a DashboardProvider");
	}
	return context;
};
