import React, { useState } from "react";

export default function useInput() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	return { email, password, handleEmail, handlePassword };
}
