import React, { memo, useEffect, useState, Suspense } from "react";
import {
	Container,
	Text,
	TableContainer,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Box,
	Thead,
	Tr,
	IconButton,
	Button,
	Center,
	Flex,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
interface movieType {
	[key: string]: any;
}
import { FaArrowLeft } from "react-icons/fa";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
function Movies() {
	const [movies, setMovies] = useState([]) as any[];
	const moviesRef = collection(db, "movies");
	const navigate = useNavigate();
	const getMovies = async () => {
		try {
			const data = await getDocs(moviesRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMovies(filteredData);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		getMovies();
	}, []);

	const deleteMovie = async (id: string) => {
		try {
			const collectionRefId = doc(db, "movies", id);
			await deleteDoc(collectionRefId);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Container maxW="container.xl" p="4">
			<Text
				bgClip="text"
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				fontSize="6xl"
				fontWeight="extrabold"
			>
				Movies
			</Text>
			<Flex alignItems="center" justifyContent={"flex-end"} mt="4">
				<IconButton
					aria-label="Back"
					colorScheme="green"
					onClick={() => navigate(-1)}
					icon={<FaArrowLeft />}
				/>
			</Flex>

			<Box maxW="700px" mx="auto" my="8" shadow="lg" p="4" borderRadius="lg">
				<Suspense fallback={<div>Loading...</div>}>
					<TableContainer>
						<Table variant={"simple"}>
							<TableCaption>Movies Data</TableCaption>
							<Thead>
								<Tr>
									<Th>Title</Th>
									<Th>Released Date</Th>
									<Th>Won Oscar</Th>
								</Tr>
							</Thead>
							<Tbody>
								{movies.map((movie: movieType) => (
									<Tr key={movie.id}>
										<Td>{movie.title}</Td>
										<Td>{movie.releasedDate}</Td>
										<Td>{movie.wonOscar ? "Yes" : "No"}</Td>
										<Td>
											<IconButton
												onClick={() => deleteMovie(movie.id)}
												aria-label="Delete"
												icon={<FaTrash />}
												colorScheme="green"
											/>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</Suspense>
			</Box>
			<Center>
				<Button
					onClick={() => navigate("/editor")}
					variant={"outline"}
					colorScheme="green"
					mt="4"
				>
					Add Movie
				</Button>
			</Center>
		</Container>
	);
}

export default memo(Movies);
