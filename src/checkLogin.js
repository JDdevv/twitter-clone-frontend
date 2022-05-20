import axios from "axios";


async function checkLogin() {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    let logged = false
    await axios.post("http://localhost:4000/validateToken",{token:accessToken})
    .then( response => {
        if ( response.status === 200 ) {
            logged = true
        }
    })
    .catch( async(err) => {
            await axios.post("http://localhost:4000/refreshToken",{token:refreshToken})
            .then( response => {
                if ( response.status === 200 ) {
                    localStorage.removeItem("accessToken")
                    localStorage.setItem("accessToken",response.data.accessToken)
                    logged = true
                }
            })
            .catch( err => {
                logged= false
            })
    })

    return logged
}



export default checkLogin