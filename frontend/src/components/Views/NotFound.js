import React from 'react';
import {Col, Row} from "reactstrap";
import SearchBox from "../SearchBox/SearchBox";
import AddWordView from "../AddWord/AddWordView";


// Set prop types
type NotFoundProps = {};

class NotFound extends React.Component<HomeProps> {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return (
            <Row>
                <Col col={12} className={"mb-4"}>
                    <div className={"d-flex flex-column justify-content-center align-items-center"}>
                        <h2 className={"typography-bold primary-text not-found"}>403</h2>
                        <div>Whoops, page not found</div>
                    </div>

                </Col>
            </Row>
        );
    };

}

// Set default props
NotFound.defaultProps = {};

export default NotFound;
