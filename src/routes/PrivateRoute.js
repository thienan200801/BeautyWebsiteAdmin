import { React } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getCookie } from 'utils/helper';
export default function PrivateRoute({ children, ...rest }) {
    const user = getCookie("user")
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user && user.length ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}