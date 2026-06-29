import { useState } from "react";
import { login } from "../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await login({
                email,
                password
            });

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);

            alert("Login succesful");

        } catch (error) {

            console.error(error);

            alert("User or password invalid");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>CumpleApp</h1>

                <p>
                    Administración de eventos
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Iniciar sesión
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;