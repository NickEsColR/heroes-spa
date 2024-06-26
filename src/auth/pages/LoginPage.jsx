import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext } from "react";
import { useForm } from "../../hooks";

export const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, onInputChange } = useForm({
        name: "",
    });

    const onLogin = () => {
        if(name.trim().length === 0) return;
        const lastPath = localStorage.getItem("lastPath") || "/";

        login(name);

        navigate(lastPath, { replace: true });
    };

    return (
        <div className="container mt-5">
            <h1>Login Page</h1>
            <hr />

            <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={onInputChange}
                autoComplete="off"
                autoFocus
            />
            {name.trim().length === 0 && (
                <p><small className="text-danger">Name is required</small></p>
            )}

            <button className="btn btn-primary mt-3" onClick={onLogin}>
                Login
            </button>
        </div>
    );
};
