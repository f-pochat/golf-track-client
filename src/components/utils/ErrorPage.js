import React from 'react';
import {MdOutlineMobileOff} from "react-icons/md";

function ErrorPage(props) {
    return (
        <div>
            <h2><MdOutlineMobileOff size={100} color={'red'} className="mt-4"/></h2>
            <h1 className="mt-5 p-1">Can't add courses in Mobile</h1>
        </div>
    );
}

export default ErrorPage;