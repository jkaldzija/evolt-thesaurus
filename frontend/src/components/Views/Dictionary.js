import React from 'react';
import {Col, Row} from "reactstrap";
import AddWordView from "../AddWord/AddWordView";
import DictionaryView from "../Dictionary/DictionaryView";


// Set prop types
type DictionaryProps = {};

class Dictionary extends React.Component<DictionaryProps> {

    render() {

        return (
            <Row>
                <Col sm={12} md={8} className={"mb-4"}>
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
