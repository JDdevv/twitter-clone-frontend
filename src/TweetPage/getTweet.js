import axios from "axios";


async function getTweet( tweetId ) {
    let tweet = null
    await axios.get("http://localhost:5000/tweets/"+tweetId)
    .then( response => {
        if ( response.status === 200 ) tweet = response.data.tweet
    })
    .catch( err => {
        tweet = false
    })
    return tweet
}


export default getTweet