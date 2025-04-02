"use client";

import {cn} from "@/lib/utils";
import {Moon, Sun} from "lucide-react";
import {useState} from "react";
import {Hint} from "./hint";
import {Button} from "./ui/button";

type Props = {
	className?: string;
	word?: boolean;

	size?: number;
};

export default function SwitchTheme({className, word = false, size = 16}: Props) {
	const [theme, setTheme] = useState("light");
	return (
		<>
			<Hint label="switch theme">
				<Button
					className={cn(
						"!text-white font-semibold w-full",
						"dark:bg-indigo-900 dark:hover:bg-indigo-950",
						"bg-sunsetCoral hover:bg-sunsetCoralHover ",
						className,
					)}
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
					{theme === "dark" ? (
						word ? (
							"Dark mode"
						) : (
							<Moon size={size} />
						)
					) : word ? (
						"Light mode"
					) : (
						<Sun size={size} />
					)}
				</Button>
			</Hint>
		</>
	);
}
