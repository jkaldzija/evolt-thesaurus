import React from 'react';
import {Button, Card} from "reactstrap";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import AddWordDialog from "./AddWordDialog";
import style from "./style.module.css";

class AddWordView extends React.Component {

    state = {
        addSynonymDialogOpen: false
    };

    toggleDialog = (key) => () => {
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
            <ThemeButton onClick={this.toggleDialog("addSynonym")} className={style['add-word']}>Let us know</ThemeButton>
            <AddWordDialog
                toggle={this.toggleDialog("addSynonym")}
                isOpen={this.state.addSynonymDialogOpen}
            />
        </Card>
    };

}

export default AddWordView;
