import React from 'react';
import {Card, CardBody, CardTitle} from "reactstrap";
import {alphabet} from "../Utility/alphabet";
import wordService from "../../api/wordService";
import WordList from "./WordList";
import {getQueryParam} from "../Utility/routing";
import {getSafe} from "../Utility/state";
import {withRouter} from "react-router";
import {WithLoading} from "../HOC/WithLoading";

const WORDS_PER_PAGE = 10;

const WordListWithLoading = WithLoading(WordList);

// Set prop types
type DictionaryViewProps = {};

class DictionaryView extends React.Component<DictionaryViewProps> {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            wordList: [],
            count: undefined,
            page: 0
        }
    }

    loadData = async () => {
        this.setState({
            isLoading: true
        } );

        const page = parseInt(getSafe(getQueryParam(this.props.location.search, "page"), 0));

        const {data} = await wordService.listWordsPaginated(page * WORDS_PER_PAGE, WORDS_PER_PAGE);
        this.setState({
            page,
            wordList: data.words,
            wordCount: data.count,
            isLoading: false
        });
    };

    componentDidUpdate(prevProps, prevState){
        if(getQueryParam(prevProps.location.search, "page") != getQueryParam(this.props.location.search, "page")){
            this.loadData();
        }
    }


    componentDidMount(){
        this.loadData();
    }


    render() {
        const {isLoading, wordList, wordCount, page} = this.state;
        return (
            <Card>
                <CardTitle className={"mb-0"}>
                    <h5>Not sure what you are looking for? Take a look at our dictionary:</h5>
                </CardTitle>
                <CardBody className={"px-0"}>
                    <WordListWithLoading
                        isLoading={isLoading}
                        wordList={wordList}
                        pages={wordCount / WORDS_PER_PAGE}
                        page={page}
                    />
                </CardBody>

            </Card>
        );
    };

}

// Set default props
DictionaryView.defaultProps = {};

export default withRouter(DictionaryView);
