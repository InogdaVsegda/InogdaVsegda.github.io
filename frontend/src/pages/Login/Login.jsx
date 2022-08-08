import React from "react";
import cl from "./Login.module.css"
import { useContext } from "react";
import MyButton from "../../components/UI/button/MyButton";
import MyInput from "../../components/UI/input/MyInput";
import { AuthContext } from "../../context";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', true)
    }

    return (
        <div className={cl.login}>
            <h1 className={cl.login__header}>Authorization</h1>
            <form className={cl.login__form} onSubmit={login}>
                <MyInput type="text" placeholder="Login"/>
                <MyInput className={cl.margin} type="password" placeholder="Password"/>
                <MyButton light>Sign in</MyButton>
            </form>
        </div>
    );
};

export default Login;