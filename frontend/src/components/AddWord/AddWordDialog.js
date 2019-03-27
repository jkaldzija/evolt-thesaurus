import React from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import wordService from "../../api/wordService";
import {toast} from "react-toastify";
import style from "./style.module.css";
import SynonymFormItem from "./SynonymFormItem";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import classnames from "classnames";
import {notifyError, notifySuccess} from "../Utility/notification";
import {eliminateWhiteSpace} from "../Utility/state";


// Set prop types
type AddSynonymDialogProps = {
    isOpen: boolean,
    reloadData: () => void,
    toggle: () => void,
    title: string,
    word: string
};

class AddWordDialog extends React.Component<AddSynonymDialogProps> {
    state = {
        value: "",
        synonyms: []
    };

    addSynonym = () => this.setState({
        synonyms: [...this.state.synonyms, ""]
    });

    removeSynonym = index => () => {
        const synonyms = [...this.state.synonyms];
        synonyms.splice(index, 1);
        this.setState({synonyms})
    };

    handleWordChange = event => this.setState({
        value: eliminateWhiteSpace(event.target.value)
    });

    handleSynonymChange = index => value => {
        const synonyms = [...this.state.synonyms];
        synonyms[index] = eliminateWhiteSpace(value);
        this.setState({synonyms})
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isOpen != this.props.isOpen && this.props.isOpen){
            this.setState({
                value: this.props.word.value
            })
        }
    }

    onClose = () => {
        this.setState({
            value: "",
            synonyms: []
        });
        this.props.toggle();
    };

    onSave = async (e) => {
        e.preventDefault();
        try {
            await wordService.createWord(this.state);
            notifySuccess("Word saved");
            this.onClose();
            this.props.reloadData();
        } catch (e) {
            notifyError("Error happened while saving");
            console.log(e);
        }
    };

    renderSynonyms = () => {
        return this.state.synonyms.map((synonym, index) => {
            return <SynonymFormItem key={`${index}`} value={synonym} onChange={this.handleSynonymChange(index)} onDelete={this.removeSynonym(index)}/>
        })
    };

    render() {
        const {isOpen, title} = this.props;
        const {value, synonyms} = this.state;
        return (
            <Modal isOpen={isOpen} size={"lg"} toggle={this.onClose}>
                    <ModalHeader className={classnames("typography-bold", style.header)}>

                        <div className={"d-flex justify-content-between w-100"}>
                            <div>{title}</div>
                            <FontAwesomeIcon className={style.close} onClick={this.onClose} icon={faTimes}/>
                        </div>

                    </ModalHeader>

                <ModalBody>
                    <form onSubmit={this.onSave}>
                        <Row>
                            <Col sm={12} md={{size:6}} className="mb-3">
                                <label htmlFor={"word"}>Word</label>
                                <Input label="Word"
                                       className={style.input}
                                       value={value}
                                       name={"word"}
                                       placeholder={"Type the word"}
                                       onChange={this.handleWordChange}/>
                            </Col>
                            <Col sm={12} md={{ size: 12, offset: 0 }} >
                                <label>Synonyms</label>
                                {this.renderSynonyms()}

                            </Col>
                            <Col sm={12} >
                                <ThemeButton onClick={this.addSynonym}>
                                    <FontAwesomeIcon icon={faPlus} className={"mr-2"} />
                                    Add synonym
                                </ThemeButton>
                            </Col>
                            <Col sm={12} md={{size: 6, offset: 6}}>
                                <div className="d-flex justify-content-end">
                                    <ThemeButton className={style.submit}>
                                        Submit
                                    </ThemeButton>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
        );
    };

}

// Set default props
AddWordDialog.defaultProps = {
    open: false,
    toggle: () => {},
    reloadData: () => {},
    title: "Add word",
    word: {value:""}
};

export default AddWordDialog;
