import React from 'react';
import {Card, Container, Input, Spinner} from "reactstrap";
import style from "./searchBox.module.css";
import classnames from "classnames";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import {WithLoading} from "../HOC/WithLoading";
import SynonymList from "../SynonymList/SynonymList";
import {withRouter} from "react-router";
import * as qs from "qs";
import wordService from "../../api/wordService";
import {getSafe, getSafeDeep} from "../Utility/state";
import {getQueryParam} from "../Utility/routing";

const SynonymListWithLoading = WithLoading(SynonymList);

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        let currentSearch = getQueryParam(this.props.location.search, "q");
        if(!currentSearch) currentSearch = "";

        this.state = {
            search: currentSearch,
            currentWord: undefined,
            isLoading: false
        }
    }

    performSearch = async() => {
        if(this.state.search === "") return;
        this.setState({
            isLoading: true
        } );
        let response = {};
        try{
            response = await wordService.getSynonymsForWord(getSafe(this.state.search));
        }catch (e) {

        }
        this.setState({
            currentWord: getSafe(response.data),
            isLoading: false
        });

    };

    componentDidMount(){
        this.performSearch();
    }

    componentDidUpdate(prevProps, prevState, SS){
        const prevSearch = getQueryParam(prevProps.location.search, "q");
        const search = getQueryParam(this.props.location.search, "q");
        console.log(prevSearch + "   " + search);
        if(search != prevSearch){
            this.setState({ search }, () => {
                this.performSearch();
            });

        }

    }


    onSearch = (e) => {
        e.preventDefault();
        let params = qs.parse(this.props.pathname);
        params.q = this.state.search;

        this.props.history.push(`?${qs.stringify(params)}`);

    };


    onInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    reloadData = () => {
        this.performSearch();
    };

    render() {
        return  <Card>
                    <form onSubmit={this.onSearch} className={classnames("d-flex", style.form)}>

                        <Input placeholder={"Please enter a word to find synonims"}
                            className={classnames(style["search-input"])}
                            value={this.state.search}
                            name={"search"}
                            onChange={this.onInput}
                        />
                        <ThemeButton className={style.button}>
                            Search
                        </ThemeButton>

                    </form>
                    <SynonymListWithLoading
                        reloadData={this.reloadData}
                        currentWord={this.state.currentWord}
                        isLoading={this.state.isLoading}
                        synonymList={getSafeDeep(this.state, "currentWord.synonyms", [])}  />


                </Card>
    };

}

export default withRouter(SearchBox);
