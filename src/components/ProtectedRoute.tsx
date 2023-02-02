import { Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Signin from "../pages/Signin";
export default function ProtectedRoute() {
	const { user } = useAuth();
	return typeof user === "undefined" ? (
		<div>Loading...</div>
	) : user ? (
		<Outlet />
	) : (
		<Signin />
	);
}
