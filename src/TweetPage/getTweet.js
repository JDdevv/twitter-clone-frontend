import axios from "axios";

//Api call for getting the tweet
//Using an async function so i can return the tweet objet instead of the axios promise
async function getTweet( tweetId ) {
    let tweet = null
    //A request is made to get data from the server. 
    //Then the data is stored in the variable and that variable is returned from the function,
    //This is made to return the data from the request and not the actual request promise
 
    await axios.get("http://localhost:5000/tweets/"+tweetId)
    .then( response => {
        if ( response.status === 200 ) tweet = response.data
        console.log(response)
        if ( response.status === 200 ) {
            tweet = response.data.tweet
            console.log(tweet,"tweet")
        }
    })
    .catch( err => {
        tweet = false
    })
    return tweet
}


export default getTweet