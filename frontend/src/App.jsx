import {

    BrowserRouter,

    Routes,

    Route

} from "react-router-dom";

import Layout from "./components/Layout";

import UploadPage from "./pages/UploadPage";

import DashboardPage from "./pages/DashboardPage";

import LibraryPage from "./pages/LibraryPage";

import StatusPage from "./pages/StatusPage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<UploadPage />}
                    />

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/library"
                        element={<LibraryPage />}
                    />

                    <Route
                        path="/status"
                        element={<StatusPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;