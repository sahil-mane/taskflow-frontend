import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import TaskPage from "../pages/TaskPage";
import ProtectedRoute from "./ProtectRoute";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<AuthPage />}
				/>

				<Route element={<ProtectedRoute />}>
					<Route
						path="/dashboard"
						element={<TaskPage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;