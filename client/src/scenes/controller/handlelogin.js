import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const ENDPOINT = process.env.REACT_APP_API_URL;
const HandleLogin = () => {
    const dispatch = useDispatch();
    const isLoggedIn = Boolean(useSelector((state) => state.auth?.token));
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const githubId = urlParams.get("githubId");

        const fetchLoginData = async () => {
            const loggedInResponse = await fetch(`${ENDPOINT}/auth/oauth_login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ githubId }),
            });
            const loggedIn = await loggedInResponse.json();
            console.log(loggedIn.user);
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home");
            }
        };

        fetchLoginData();
    }, [dispatch, navigate]);

    console.log(isLoggedIn);

    return <h1>Logging in...</h1>;
};

export default HandleLogin;
