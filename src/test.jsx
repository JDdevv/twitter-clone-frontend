import React, { useEffect, useState } from "react";
import checkLogin from "./checkLogin";
import Login from "./Login"

function Test() {
    const [ logged , setLogged ] = useState(false)
    useEffect( () => {
        checkLogin().then( isLogged => setLogged(isLogged))
    },[])
    return ( 
        <div>
            {logged && <p>anis man lo mataron</p>}
            {!logged && <Login handler={setLogged}/>}
        </div>
    )
}

export default Test