
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

import { getCookie } from "./helper";

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const AuthVerify = (props) => {
    // const { user } = useSelector(state => state.auth)
    const user = getCookie("user")
    console.log('user', user)
    props.history.listen(() => {
        if (user) {
            const decodedJwt = parseJwt(user);
            if (decodedJwt.exp * 1000 < Date.now()) {
                // props.logOut();
                console.log('het han')
                alert("exprired")

            }
        }
        else

            props.logOut();
    });

    return <></>;
};

export default withRouter(AuthVerify);