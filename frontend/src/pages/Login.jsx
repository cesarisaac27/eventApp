import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      // Guardar información de autenticación
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);

      // EVENT_OWNER → Dashboard
      if (response.role === "EVENT_OWNER") {
        navigate("/dashboard");
        return;
      }

      // SUPER_ADMIN todavía no tiene dashboard
      if (response.role === "SUPER_ADMIN") {
        alert("SUPER_ADMIN dashboard is not available yet.");
        return;
      }

      // Por si en el futuro aparece otro role
      alert("User role not recognized.");

    } catch (error) {
      console.error("Login error:", error);

      alert("User or password invalid");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center text-slate-900">
          EventApp
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Event Administration
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-red-500
              focus:ring-2
              focus:ring-red-200
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-red-500
              focus:ring-2
              focus:ring-red-200
            "
          />

          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-red-500
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-600
            "
          >
            Log In +
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;