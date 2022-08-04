import axios from "axios";



async function getReplies(tweetId) {
    let replies = null
    await axios.get("http://localhost:5000/replies/"+tweetId,{
        headers: {
            authorization: localStorage.getItem("accessToken")
        }
    })
    .then( response => {
        console.log(response)
        if ( response.status === 200) replies = response.data
    })
    .catch( err => {
        console.log(err)
        replies = false
    })
    return replies
}

export default getReplies