import React from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import * as classnames from "classnames";
import style from "../AddWord/style.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import wordService from "../../api/wordService";
import {toast} from "react-toastify";
import SynonymFormItem from "../AddWord/SynonymFormItem";
import {getSafeDeep} from "../Utility/state";
import {notifyError, notifySuccess} from "../Utility/notification";


// Set prop types
type AddSynonymDialogProps = {};

class AddSynonymDialog extends React.Component<AddSynonymDialogProps> {

    constructor(props) {
        super(props);

        this.state = {
            value: getSafeDeep(this.props, "currentWord.value", ""),
            synonyms: [""]
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.currentWord != this.props.currentWord){
            this.setState({
                value: getSafeDeep(this.props, "currentWord.value", ""),
                synonyms: [""]
            })
        }
    }

    addSynonym = () => this.setState({
        synonyms: [...this.state.synonyms, ""]
    });

    removeSynonym = index => () => {
        const synonyms = [...this.state.synonyms];
        synonyms.splice(index, 1);
        this.setState({synonyms})
    };

    handleWordChange = event => this.setState({
        value: event.target.value
    });

    handleSynonymChange = index => value => {
        const synonyms = [...this.state.synonyms];
        synonyms[index] = value;
        this.setState({synonyms})
    };

    onClose = () => {
        this.setState({
            value: "",
            synonyms: []
        });
        this.props.reloadData();
        this.props.toggle();
    };

    onSave = async (e) => {
        e.preventDefault();
        try {
            await wordService.createWord(this.state);
            notifySuccess("Syonyms saved");
            this.onClose();
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

        const {isOpen} = this.props;
        const {value, synonyms} = this.state;
        return (
            <Modal isOpen={isOpen} size={"lg"} toggle={() => this.onClose()}>
                <ModalHeader className={classnames("typography-bold", style.header)}>

                    <div className={"d-flex justify-content-between w-100"}>
                        <div>Add word</div>
                        <FontAwesomeIcon className={style.close} onClick={() => this.onClose()} icon={faTimes}/>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => this.onSave(e)}>
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
                                <ThemeButton onClick={(e) => this.addSynonym()}>
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
AddSynonymDialog.defaultProps = {};

export default AddSynonymDialog;
