import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context";
import cl from "./Navbar.module.css"
import MyButton from "../UI/button/MyButton";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__links}>
                <Link to={"/about"} className={cl.navbar__links__link}>About</Link>
                <Link to={"/posts"} className={cl.navbar__links__link}>Posts</Link>
            </div>
            <MyButton light onClick={logout}>
                Log out
            </MyButton>
      </div>
    )
}

export default Navbar;