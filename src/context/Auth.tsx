import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext({} as any);

type childrenType = React.ReactNode | JSX.Element;

const AuthProvider = ({ children }: { children: childrenType }) => {
	const [user, setUser] = useState({}) as any;
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
			}
		});
		return unsub;
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
