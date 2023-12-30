import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
const Register = ({ onRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ email, password });
    };


    return (
        <>
            <Header>
                <Link className="header__button" to="/sign-in" >Войти</Link>
            </Header>
            <section className="auth">
                <div className="auth__contanier">
                    <h1 className="auth__title">Регистрация</h1>
                    <form className="auth__form" onSubmit={handleSubmit}>
                        <input
                            className="auth__holder"
                            type="email"
                            name="email"
                            value={email}
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input className="auth__holder"
                            type="password"
                            name="password"
                            value={password}
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Пароль"

                        />
                        <button className="auth__submit" type="submit">Зарегистрироваться</button>

                    </form>
                    <p className="auth__ask">Уже зарегистрированы?
                        <Link className="auth__link" to="/sign-in"> Войти</Link>
                    </p>
                </div>
            </section>
        </>
    );
}
export default Register;