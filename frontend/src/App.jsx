import { Routes, Route } from "react-router-dom";
import MainMessagePage from "./pages/MainMessagePage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/:slug"
        element={<MainMessagePage />}
      />
    </Routes>
  );
}