import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
const Login = ({ onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <>
            <Header>
                <Link className="header__button" to="/sign-up">Регистрация</Link>
            </Header>
            <section className="auth">
                <div className="auth__contanier">
                    <h1 className="auth__title">Вход</h1>
                    <form className="auth__form" onSubmit={handleSubmit}>
                        <input className="auth__holder"
                            type="email"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input className="auth__holder"
                            type="password"
                            placeholder="Пароль"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button className="auth__submit">Войти</button>
                    </form>
                </div>
            </section>
        </>
    );
}
export default Login;