import React from 'react';
import {Col, Row} from "reactstrap";
import SearchBox from "../SearchBox/SearchBox";
import AddWordView from "../AddWord/AddWordView";


// Set prop types
type HomeProps = {};

class Home extends React.Component<HomeProps> {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return (
            <Row>
                <Col sm={12} md={8} className={"mb-4"}>
                    <SearchBox/>
                </Col>
                <Col>
                    <AddWordView/>
                </Col>
            </Row>
        );
    };

}

// Set default props
Home.defaultProps = {};

export default Home;
