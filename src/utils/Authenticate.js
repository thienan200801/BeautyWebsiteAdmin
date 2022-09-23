/* eslint-disable react/display-name */

import { React } from 'react'
import { Redirect } from 'react-router-dom';

import { getCookie } from './helper';

const verifyAuth = (authCriteria) => {
    return Boolean(authCriteria?.length > 0);
};

// Authentication HoC
// withAuth return an fuction that accept Component as input parameter, then return an function from its props to decide shoudld it redirect to login 
const withAuth = ({ redirectPath = "/login" } = {}) => (
    Component
) => (props) => {
    // console.log("auth criteria", getCookie("user"))
    // console.log("path", redirectPath)
    const authCriteria = getCookie("user")
    const isAuthorized = verifyAuth(authCriteria);
    console.log('is Auth', isAuthorized)
    return isAuthorized ? (
        <Component {...props} />
    ) : (
        <Redirect
            to={{
                pathname: redirectPath,
            }} />
    );
};



export const authRoute = withAuth();
