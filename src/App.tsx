import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import Editor from "./pages/Editor";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/editor" element={<Editor />} />
				</Route>
				<Route path="*" element={<div>404</div>} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	);
}
