import React from "react";
import Container from "../Generic/Container";
import LargeHeading from "../Generic/LargeHeading";
import Text from "../Generic/Text";
import Button from "../Generic/Button";

function ProfileInfo(props) {
    return ( 
        <Container>
            <LargeHeading  styles="username-heading">
                {props.user.username}
            </LargeHeading>
            <Text>
                {props.user.description}
            </Text>
            <Button handler={props.handler} text={props.isFollowing ? "dejar de seguir":"seguir" } />
        </Container>
    )
}

export default ProfileInfo