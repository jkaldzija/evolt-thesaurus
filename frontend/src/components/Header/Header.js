import React from 'react';
import style from "./header.module.css";
import {Container} from "reactstrap";
import * as classnames from "classnames";
import {Link, NavLink} from "react-router-dom";
import {routes} from "../Utility/routing";

class Header extends React.Component {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return <div className={classnames(style.wrapper, "d-flex align-items-center primary")}>
            <Container className={"d-flex align-items-center"}>
                <h1 className={classnames(style.title, "va-text")}>Thesaurus</h1>
                <NavLink exact activeClassName={style.active} className={style.link} to={routes.home.path}>Home</NavLink>
                <NavLink exact activeClassName={style.active} className={style.link} to={routes.dictionary.path}>Dictionary</NavLink>
            </Container>
        </div>;
    };

}

export default Header;
