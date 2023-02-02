import loader from "../assets/loader.json";
import Lottie from "lottie-react";
import { Box } from "@chakra-ui/react";
export default function Loader() {
	return (
		<Box
			w="100%"
			h="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Box maxW={500} w="100%" h="100%" maxH={500}>
				<Lottie animationData={loader} autoPlay={true} />
			</Box>
		</Box>
	);
}
