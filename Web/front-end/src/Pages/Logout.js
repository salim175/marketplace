import { Redirect } from "react-router-dom";

function Logout({ history })
{
    localStorage.clear();
    // history.push('/auth/login');
    return (
        <>
            <Redirect to="/auth/login" />
        </>)
}

export default Logout;