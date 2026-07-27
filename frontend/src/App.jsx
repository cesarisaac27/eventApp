import { Routes, Route } from "react-router-dom";
import MainMessagePage from "./pages/MainMessagePage";
import WriteMessagePage from "./pages/WriteMessagePage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/:slug/write-message"
        element={<WriteMessagePage />}
      />
      <Route
        path="/:slug"
        element={<MainMessagePage />}
      />
    </Routes>
  );
}