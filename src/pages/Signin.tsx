import useInput from "../hooks/useInput";
import useSignIn from "../hooks/useSignIn";
import {
	Box,
	Divider,
	FormControl,
	FormLabel,
	Input,
	Button,
	Text,
	Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Signin() {
	const navigate = useNavigate();
	const { email, password, handleEmail, handlePassword } = useInput();
	const { signIn } = useSignIn();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Box
			w="100%"
			h="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Box
				maxW="500px"
				w="100%"
				p="4"
				borderWidth="1px"
				borderRadius="lg"
				boxShadow={"lg"}
			>
				<Text textAlign="center" fontSize="2xl" fontWeight="bold">
					Sign in to your account
				</Text>
				<Text as="p" textAlign="center" fontSize="md" color="gray.500">
					Don't have an account?{" "}
					<Link color="teal.500" href="/signup">
						Sign up
					</Link>
				</Text>
				<Divider
					orientation="horizontal"
					borderRadius={8}
					borderColor="gray.500"
					my="4"
				/>
				<form onSubmit={handleSubmit}>
					<FormControl id="email">
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							value={email}
							required
							onChange={handleEmail}
							placeholder="Enter your email"
						/>
					</FormControl>
					<FormControl id="password">
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							value={password}
							onChange={handlePassword}
							placeholder="Enter your password"
						/>
					</FormControl>
					<Button type="submit" mt="4" colorScheme="teal">
						Sign in
					</Button>
				</form>
			</Box>
		</Box>
	);
}
