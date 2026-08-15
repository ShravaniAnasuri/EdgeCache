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

import { VideoProvider } from "./context/VideoContext";

function App() {

    return (

        <BrowserRouter>

            <VideoProvider>
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
            </VideoProvider>
        </BrowserRouter>

    );

}

export default App;