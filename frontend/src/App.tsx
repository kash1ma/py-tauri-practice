import "./App.css";
import ErrorPage from "./pages/error/ErrorPage";
import MainPage from "./pages/main/MainPage";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Navigate to="pizzalist" replace />} />
        <Route path="/pizzaList" element={<MainPage />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
