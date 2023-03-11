import axios from "axios";
//A request is made to server, the data from that request is stored in a variable and that variable is returned from the function.
//This is made to return the requested data and not the request promise itself.

async function getData( url, authorizationNeeded ) {
    let data = null 
    let config = {
        headers:{}
    }
    //Sets the authorization header in case its needed
    if ( authorizationNeeded ) {
        config.headers.authorization = localStorage.getItem('accessToken')
    }
    await axios.get( url , config ).then( response => {
        if ( response.status === 200 ) data = response.data
    }).catch( err => {
        console.log(err)
        data = false
    })
    return data

}

export default getData