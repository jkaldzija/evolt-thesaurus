import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './fonts.css';
import {Col, Container, Row} from "reactstrap";
import {ToastContainer} from "react-toastify";
import SearchBox from "./components/SearchBox/SearchBox";
import wordService from "./api/wordService";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header";
import {Route, Switch, withRouter} from "react-router";
import AddWordView from "./components/AddWord/AddWordView";
import {routes} from "./components/Utility/routing";
import Home from "./components/Views/Home";
import Dictionary from "./components/Views/Dictionary";


export const navigationRoutes = [
    {
        path: routes.home.path,
        component: Home
    },
    {
        path: routes.dictionary.path,
        component: Dictionary
    }
];

class App extends Component {
    state = {
        addDialogOpen: false,
        word: null
    };

    toggleAddDialog = () => this.setState({
        addDialogOpen: !this.state.addDialogOpen
    });

    onSubmit = async (word) => {
        const response = await wordService.getSynonymsForWord(word);
        this.setState({word: response.data});
    };

    render() {
        const {addDialogOpen, word} = this.state;
        return (
            <div>
                <ToastContainer/>
                <Header />
                <Container>
                    <Switch>
                        {navigationRoutes.map((routeItem, index) => {
                            const TagName = routeItem.component;
                            return <Route key={routeItem.path} exact path={routeItem.path} component={TagName} />
                        })}
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(App);
