import axios from "axios";

//Api call for getting the tweet
//Using an async function so i can return the tweet objet instead of the axios promise
async function getTweet( tweetId ) {
    let tweet = null
    await axios.get("http://localhost:5000/tweets/"+tweetId)
    .then( response => {
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