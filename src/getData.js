import axios from "axios";


async function getData( url ) {
    let data = null 
    await axios.get( url ).then( response => {
        if ( response.status === 200 ) data = response.data
    }).catch( err => {
        data = false
    })
    return data

}

export default getData