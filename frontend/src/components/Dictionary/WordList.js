import React, {Fragment} from 'react';
import ReactPaginate from 'react-paginate';
import * as qs from "qs";
import {withRouter} from "react-router";
import {getSynonymRoute, redirect, routes} from "../Utility/routing";
import style from "./dictionary.module.css";
import * as classnames from "classnames";
import {NavLink, Table} from "reactstrap";
import {Link} from "react-router-dom";


// Set prop types
type WordListProps = {
    wordList: Array<string>
};

class WordList extends React.Component<WordListProps> {

    constructor(props) {
        super(props);

    }


    handlePageClick = (page) => {
        const query = {...this.props.query};
        query.page = page.selected;
        redirect(this.props.history, `${this.props.location.pathname}?${qs.stringify(query)}`);
    };

    buildPaginationLink = (index) => {
        const query = {...this.props.query};
        query.page = index;
        return `${this.props.location.pathname}?${qs.stringify(query)}`;
    };

    renderWordList = () => {
        return <Table>
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Synonym list</th>
                </tr>
            </thead>
            <tbody>
                {this.props.wordList.map((word, index) => {
                    return <tr className={style.word}>
                        <td>{word}</td>
                        <td>
                            <Link className={style['table-link']} to={getSynonymRoute(word)} >Expand synonyms</Link>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
    };

    render() {

        return (
            <div>
                {this.renderWordList()}

                <div className={classnames(style.pagination, "d-flex justify-content-center w-100 ")}>
                    <ReactPaginate
                        previousLabel={'Back'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={this.props.pages}
                        marginPagesDisplayed={2}
                        activeClassName={style.active}
                        disabledClassName={style.disabled}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick}
                        hrefBuilder={(index) => this.buildPaginationLink(index)}
                        forcePage={this.props.page}
                    />
                </div>
            </div>
        );
    };

}

// Set default props
WordList.defaultProps = {
    wordList: ["Word one", "Word two", "Word three"]
};

export default withRouter(WordList);
