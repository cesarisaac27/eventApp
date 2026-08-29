import { Routes, Route, Navigate } from "react-router-dom";
import MainMessagePage from "./pages/MainMessagePage";
import WriteMessagePage from "./pages/WriteMessagePage";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import MessagesPage from "./pages/MessagesPage";
import EditMessagesPage from "./pages/EditMessagesPage";

export default function App() {
  return (
    <Routes>

      {/* Página principal */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Eventos públicos */}
      <Route
        path="/:slug/write-message"
        element={<WriteMessagePage />}
      />

      <Route
        path="/:slug"
        element={<MainMessagePage />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/dashboard/:slug/messages"
        element={<MessagesPage />}
      />

      <Route
        path="/dashboard/:slug/editMessages"
        element={<EditMessagesPage />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>
  );
}