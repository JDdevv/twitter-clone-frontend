import React from "react";
import Container from "../Generic/Container";
import Text from "../Generic/Text";



function ProfileStats(props) {
    return (
        <Container>
            <Text>followers {props.followers.length}</Text>
            <Text>following {props.following.length}</Text>
        </Container>
    )
}


export default ProfileStats
        