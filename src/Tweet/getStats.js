import axios from "axios";


async function getStats(tweetId) {
    let stats = false
    //A request is made to get data from the server. 
    //Then the data is stored in the variable and that variable is returned from the function,
    //This is made to return the data from the request and not the actual request promise
    await axios.get("http://localhost:5000/stats/"+tweetId)
    .then( response => {
        if ( response.status === 200 ) {
            stats = response.data
        }
    })
    .catch( err => console.log(err))
    return stats
}


export default getStats