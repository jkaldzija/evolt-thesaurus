import React from 'react';
import style from "./header.module.css";
import {Container} from "reactstrap";
import classnames from "classnames";
import {Link, NavLink} from "react-router-dom";
import {routes} from "../Utility/routing";

class Header extends React.Component {

    render() {

        return <div className={classnames(style.wrapper, "d-flex align-items-center primary")}>
            <Container className={"d-flex align-items-center"}>
                <h1 className={classnames(style.title, "va-text")}>Thesaurus</h1>
                <NavLink exact activeClassName={style.active} className={style.link} to={routes.home.path}>Home</NavLink>
                <NavLink exact activeClassName={style.active} className={style.link} to={routes.dictionary.path}>Dictionary</NavLink>
                <Link className={classnames(style.link, "d-none d-md-block")} target={"_blank"} to={`/api/v1/swagger-ui.html`}>Docs</Link>
            </Container>
        </div>;
    };

}

export default Header;
