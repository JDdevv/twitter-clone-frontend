import React, { useEffect } from "react";
import checkLogin from "./GeneralUseFunctions/checkLogin";
import getData from "./GeneralUseFunctions/getData"


function Test() {
    useEffect( ()=> {
        checkLogin().then( logged => {
                getData("http://localhost:5000/feed",true).then( res => console.log(res))
        })  
    })
    return (
        <div>
            <p>sdf</p>
        </div>
    )
}


export default Test