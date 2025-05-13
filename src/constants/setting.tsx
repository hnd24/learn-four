import {LanguageType} from "@/types";

export enum LanguageEnum {
	English = "English",
	Vietnamese = "Vietnamese",
}

export const Language: Record<LanguageEnum, LanguageType> = {
	English: {
		value: "English",
		label: "English",
		image: "/icon/us-icon.svg",
	},
	Vietnamese: {
		value: "Vietnamese",
		label: "Việt Nam",
		image: "/icon/vietnam-icon.svg",
	},
};

export enum PageEnum {
	Home = "Home",
	Problem = "Problem",
	About = "About",
}
export type PageType = {
	name: string;
	path: string;
};

export const DefaultPage: Record<PageEnum, PageType> = {
	Home: {name: "Home", path: "/"},
	Problem: {name: "Problem", path: "/problem"},
	About: {name: "About", path: "/about"},
};
