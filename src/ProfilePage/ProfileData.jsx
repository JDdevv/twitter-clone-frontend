import React, { useEffect, useState } from "react";
import Container from "../Generic/Container";
import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";
import ProfileStats from "./ProfileStats";
import { useNavigate, useSearchParams } from "react-router-dom";
import checkLogin from "../GeneralUseFunctions/checkLogin";
import axios from "axios";
import getData from "../GeneralUseFunctions/getData";


function ProfileData(props) {
    const [sameUser,setSameUser] = useState(false)
    const [isFollowing, setIsFollowing ]= useState(false)
    useEffect( () => {
        setSameUser(props.user.sameUser)
        setIsFollowing(props.user.isFollowing)
    },[props.user])
    const navigate = useNavigate()
        function follow() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            axios.patch("http://localhost:4000/users/follow/"+props.userId,{},{
                headers :{
                    "Authorization":localStorage.getItem("accessToken")
                }
            }).then( response => {
                if ( response.status === 200 ) {
                    props.handler()
                }
            })
        })


    }
    return (
        <Container>
            <ProfileBanner/>
            <ProfileInfo user={props.user} handler={follow} isFollowing={isFollowing} sameUser={sameUser}/>
            <ProfileStats following={props.user.following} followers={props.user.followers}/>

        </Container>
    )
}


export default ProfileData