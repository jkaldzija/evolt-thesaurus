import React from 'react';
import {Col, Row} from "reactstrap";
import SearchBox from "../SearchBox/SearchBox";
import AddWordView from "../AddWord/AddWordView";
import DictionaryView from "../Dictionary/DictionaryView";
import wordService from "../../api/wordService";
import {getSafe} from "../Utility/state";


// Set prop types
type DictionaryProps = {};

class Dictionary extends React.Component<DictionaryProps> {


    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return (
            <Row>
                <Col sm={12} md={8}>
                    <DictionaryView/>
                </Col>
                <Col>
                    <AddWordView/>
                </Col>
            </Row>
        );
    };

}

// Set default props
Dictionary.defaultProps = {};

export default Dictionary;
