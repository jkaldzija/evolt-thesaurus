import React from 'react';
import {Button, Input} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import classnames from "classnames";
import style from "./style.module.css";

type SynonymFormItemProps = {
    value: string,
    onChange: (string) => void,
    onDelete: () => void
}

const SynonymFormItem = ({value, onChange, onDelete}: SynonymFormItemProps) => (
    <div className="synonym-form-item d-flex mb-2">
        <Input
               className={classnames("mr-3", style.input)}
               value={value}
               required={true}
               placeholder={"Enter a synonym"}
               onChange={e => onChange(e.target.value)}/>
        <ThemeButton className={classnames(style.discard, "bg-danger text-white border-0")} onClick={onDelete}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></ThemeButton>
    </div>
);

export default SynonymFormItem;
