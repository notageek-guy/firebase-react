import {
	Box,
	Container,
	useToast,
	Text,
	Flex,
	HStack,
	Button,
	Link,
	ButtonGroup,
	Center,
} from "@chakra-ui/react";
import { ref, uploadBytes } from "firebase/storage";
import horse from "../assets/horse.json";
import { useAuth } from "../context/Auth";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";
import DarkModeToggle from "../components/DarkModeToggle";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase.config";
export default function Dashboard() {
	const toast = useToast();
	const [file, setFile] = useState(null) as any;
	const navigate = useNavigate();
	const handleFileChange = (file: any) => {
		setFile(file);
	};

	const { signOutUser } = useSignIn();
	const { user } = useAuth();
	const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];
	const handleUploadFiles = async () => {
		if (!file) return;
		const storageRef = ref(storage, `images/${file?.name}`);
		try {
			await uploadBytes(storageRef, file);
			toast({
				title: "File uploaded successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Container maxW="container.xl" p="4">
			<Box
				maxW="700px"
				mx="auto"
				p="4"
				my="4"
				shadow={"lg"}
				borderWidth="1px"
				borderRadius="lg"
			>
				<Flex justifyContent="flex-end" alignItems="center">
					<HStack spacing="4">
						<Link
							href="/movies"
							color="teal.500"
							fontWeight="bold"
							_hover={{ color: "teal.600" }}
						>
							Movies
						</Link>
						<DarkModeToggle />
						<Button colorScheme="teal" onClick={signOutUser}>
							Sign Out
						</Button>
					</HStack>
				</Flex>
			</Box>
			<Box maxW="700px" mx="auto" p="4">
				<Text fontSize="2xl" fontWeight="bold">
					Welcome {user?.email}
				</Text>
				<Box maxW="300px" mx="auto" my="4" borderRadius={8}>
					<Lottie animationData={horse} autoPlay={true} />
				</Box>
				<Center>
					<ButtonGroup spacing="4">
						<Button
							onClick={() => navigate("/movies")}
							colorScheme="teal"
							variant="outline"
						>
							Movies
						</Button>
						<Button
							onClick={() => navigate("/editor")}
							colorScheme="teal"
							variant="outline"
						>
							Add Movie
						</Button>
						{/* Upload files */}
					</ButtonGroup>
				</Center>
				<Box
					p="4"
					mx="auto"
					my="4"
					shadow="lg"
					borderWidth={1}
					borderRadius={8}
				>
					<Text fontSize="2xl" fontWeight="bold">
						Upload Files
					</Text>
					<FileUploader
						handleChange={handleFileChange}
						name="file"
						types={fileTypes}
					/>
					<Button mt="4" colorScheme="teal" onClick={handleUploadFiles}>
						Upload
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
