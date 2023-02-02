import { IconButton, useColorMode } from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<IconButton
			aria-label="Toggle dark mode"
			icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
			colorScheme="teal"
			variant="ghost"
			size="lg"
			onClick={toggleColorMode}
		/>
	);
}
