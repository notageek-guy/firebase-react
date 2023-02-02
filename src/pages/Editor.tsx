import {
	Box,
	Button,
	Checkbox,
	FormLabel,
	FormControl,
	Input,
	Text,
	Container,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import { auth, db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
export default function Editor() {
	const navigate = useNavigate();
	const movieCollectionRef = collection(db, "movies");
	const [title, setTitle] = useState("");
	const [releasedDate, setReleasedDate] = useState("");
	const [wonOscar, setWonOscar] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await addDoc(movieCollectionRef, {
				title,
				releasedDate,
				wonOscar,
				userId: auth?.currentUser?.uid,
			});
			navigate("/movies");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Container maxW="container.sm" p="4">
			<Text
				bgClip="text"
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				fontSize="6xl"
				fontWeight="extrabold"
			>
				Editor
			</Text>
			<Flex alignItems="center" justifyContent={"flex-end"} mt="4">
				<IconButton
					aria-label="Back"
					colorScheme="green"
					onClick={() => navigate(-1)}
					icon={<FaArrowLeft />}
				/>
			</Flex>
			<Box maxW="500px" mx="auto" my="8" shadow="lg" p="4" borderRadius="lg">
				<Text fontSize="2xl" fontWeight="bold">
					Add a new movie
				</Text>
				<form onSubmit={handleSubmit}>
					<FormControl id="title" isRequired>
						<FormLabel>Title</FormLabel>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						/>
					</FormControl>
					<FormControl
						my="4"
						id="
                        releaseDate
                    "
						isRequired
					>
						<FormLabel>Release Date</FormLabel>
						<Input
							type="text"
							value={releasedDate}
							onChange={(e) => setReleasedDate(e.target.value)}
						/>
					</FormControl>
					<FormControl my="4" id="wonOscar">
						<FormLabel>Won Oscar</FormLabel>
						<Checkbox
							isChecked={wonOscar}
							onChange={(e) => setWonOscar(e.target.checked)}
						/>
					</FormControl>
					<Button type="submit" colorScheme="teal" variant="solid">
						Submit
					</Button>
				</form>
			</Box>
		</Container>
	);
}
