import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/mainPage.jsx";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;