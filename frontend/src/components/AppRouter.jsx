import React from "react";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { publicRoutes, privateRoutes } from "../router/routes";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
            {privateRoutes.map(route => 
                <Route 
                    element={<route.component/>}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Route path="*" element={<Navigate to="/posts" replace />}/>
            </Routes>
            : <Routes>
            {publicRoutes.map(route => 
                <Route 
                    element={<route.component/>}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Route path="*" element={<Navigate to="/login" replace />}/>
            </Routes>
    );
};

export default AppRouter;