import axios from "axios";


//Function that checks if the current user is logged by sending the tokens to the backend
async function checkLogin() {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    let logged = false

    //Send the access token to the auth api
    await axios.post("http://localhost:4000/validateToken",{token:accessToken})
    .then( response => {
        if ( response.status === 200 ) {
            logged = true
        }
    })
    //if the request results in an error the access token is invalid and should be refreshed
    .catch( async(err) => {
            //Sending the refresh token
            await axios.post("http://localhost:4000/refreshToken",{token:refreshToken})
            .then( response => {
                //If the refresh token is valid a new token is given and stored in the local storage
                if ( response.status === 200 ) {
                    localStorage.removeItem("accessToken")
                    localStorage.setItem("accessToken",response.data.accessToken)
                    logged = true
                }
            })
            .catch( err => {
                //If the token is not valid the user is not logged
                logged= false
            })
    })
    //Returns true if the user was logged succefully
    //False if the user could not be logged
    return logged
}



export default checkLogin