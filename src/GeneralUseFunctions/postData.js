import axios from "axios";


async function postData( url , content,authorizationNeeded ) {
    let data = null
    const config = {
        headers:{
            "Content-Type":"application/json",
        }
    }
    if ( authorizationNeeded ) {
        config.headers.authorization = localStorage.getItem("accessToken")
    }
    await axios.post( url, content, config).then( response => {
        if ( response.status < 400 ) data = response.data
    }).catch( 
        data = false
    )
    return data
    
    
            
}

export default postData