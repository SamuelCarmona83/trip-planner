import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext.js";


const Login = () => {
    const { store, actions } = useContext(Context);


    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (store.token) {
            navigate("/");
        }
    }, [store.token])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="rounded shadow-lg p-4 bg-dark" style={{ width: '450px' }}>
                    <h1 className="text-center text-light">Ingresar</h1>
                    <div className="mb-3">
                        <label className="form-label text-light">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.co"
                            className="form-control"
                            onChange={(event) => setUser({
                                ...user,
                                email: event.target.value
                            })}
                        />
                        <div className="form-text text-light">No compartiremos tu contraseña</div>
                    </div>
                    <div className="mb-1">
                        <label className="form-label text-light">Contraseña</label>
                        <div className="d-flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                onChange={(event) => setUser({
                                    ...user,
                                    password: event.target.value
                                })}
                            />
                            <button className="btn btn-dark ms-1" style={{ width: '60px' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >{showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                        </div>
                        <button className="btn btn-link">¿Olvidaste tu contraseña?</button>
                    </div>
                    <button
                        onClick={() => actions.login(user.email, user.password)}
                        className="btn btn-primary w-100 mt-1"
                    >
                        Ingresar
                    </button>
                    <Link to="/register" className="btn btn-link">¿No tienes una cuenta aún? Registrate aquí</Link>
                    <div className="d-flex justify-content-start opacity-50">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-3">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;
