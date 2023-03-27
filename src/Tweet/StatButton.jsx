import React from "react";
import Container from "../Generic/Container";
import Text from "../Generic/Text";
import Button from "../Generic/Button";

function StatButton(props) {
    return (
        <Container>
            <Text>{props.stat}:{props.statCount}</Text>
            <Button handler={props.handler} text={props.children}/>

        </Container>
    )
}

export default StatButton