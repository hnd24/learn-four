import {Fira_Code, Inter, JetBrains_Mono, Poppins} from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const poppins = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

export const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});
