import React from 'react';
import {Card, Container, Input, Spinner} from "reactstrap";
import style from "./searchBox.module.css";
import * as classnames from "classnames";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import {WithLoading} from "../HOC/WithLoading";
import SynonymList from "../SynonymList/SynonymList";
import {withRouter} from "react-router";
import * as qs from "qs";
import wordService from "../../api/wordService";
import {getSafe, getSafeDeep} from "../Utility/state";

const SynonymListWithLoading = WithLoading(SynonymList);

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        let currentSearch = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).q;
        if(!currentSearch) currentSearch = "";

        this.state = {
            search: currentSearch,
            currentWord: undefined,
            isLoading: false
        }
    }

    performSearch = async() => {
        this.setState({
            isLoading: true
        } );

        const {data} = await wordService.getSynonymsForWord(getSafe(this.state.search));
        this.setState({
            currentWord: data,
            isLoading: false
        });

    };

    componentDidMount(){
        this.performSearch();
    }

    componentDidUpdate(prevProps, prevState, SS){
        const prevSearch = qs.parse(prevProps.location.search, {ignoreQueryPrefix: true}).q;
        const search = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).q;
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
                            onChange={(e) => this.onInput(e)}
                        />
                        <ThemeButton className={style.button}>
                            Search
                        </ThemeButton>

                    </form>
                    <SynonymListWithLoading
                        reloadData={() => this.reloadData()}
                        currentWord={this.state.currentWord}
                        isLoading={this.state.isLoading}
                        synonymList={getSafeDeep(this.state, "currentWord.synonyms", [])}  />


                </Card>
    };

}

export default withRouter(SearchBox);