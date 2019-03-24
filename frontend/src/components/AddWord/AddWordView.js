import React from 'react';
import {Button, Card} from "reactstrap";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import AddWordDialog from "./AddWordDialog";

class AddWordView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addSynonymDialogOpen: false
        }
    }

    toggleDialogOpen = (key) => {
        const fieldKey = `${key}DialogOpen`;
        this.setState({ [fieldKey]: !this.state[fieldKey] });
    };


    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return <Card>
            <h5 className="mb-4">Know a new word?</h5>
            <ThemeButton onClick={() => this.toggleDialogOpen("addSynonym")} className="w-50">Let us know</ThemeButton>
            <AddWordDialog
                toggle={() => this.toggleDialogOpen("addSynonym")}
                isOpen={this.state.addSynonymDialogOpen}
            />
        </Card>
    };

}

export default AddWordView;
