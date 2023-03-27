import axios from "axios";


async function patchData(url , content , authorizationNeeded) {
    let data = null
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    if ( authorizationNeeded ) {
        config.headers.authorization = localStorage.getItem("accessToken")
    }
    await axios.patch(url,content,config).then( response => {
        data = response
    }).catch( err => {
        data = err
    })
    return data
}


export default patchData