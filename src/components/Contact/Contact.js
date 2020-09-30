import React from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

const Contact = (props) => {
    return (
        <React.Fragment>
            <h1>contact</h1>
            {props.open ?
                <HamburgerMenu updateOpen={props.updateOpen} open={props.open}/>
                : ''
            }
        </React.Fragment>

    )
}

export default Contact;