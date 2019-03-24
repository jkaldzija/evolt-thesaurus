import React from 'react';
import {Button} from "reactstrap";
import * as classnames from "classnames";
import style from "./themeButton.module.css";

export default function ThemeButton(props){
    return <Button onClick={props.onClick} className={classnames(style.button, props.className)}>
        {props.children}
    </Button>
}

