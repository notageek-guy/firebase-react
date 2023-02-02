import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/Auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</AuthProvider>
	</React.StrictMode>
);