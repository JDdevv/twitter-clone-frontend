import React from "react";
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom";

function Layout(props) {
    return (<>
        <Navbar/>
        <Outlet/>
    </>)
}

export default Layout