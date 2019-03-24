import React, {Fragment} from 'react';
import {Typography} from "@material-ui/core";
import type {Word} from "../../api/types";

type SynonymListProps = {
    word: Word
};

const renderSynonyms = (word: Word) => (
    <Fragment>
        <Typography variant="h6" className="synonym-list-title">Synonyms for {word.value}</Typography>
        {word.synonyms.map(synonym => (
            <Typography key={synonym} variant="body1">{synonym}</Typography>
        ))}
    </Fragment>
);

const renderEmpty = (word: Word) => (
    <div className="synonym-empty-container">
        <Typography variant="h5">No synonyms found for {word.value}</Typography>
    </div>
);

const SynonymList = ({word}: SynonymListProps) => {
    if (word.synonyms) {
        return renderSynonyms(word)
    } else {
        return renderEmpty(word);
    }
};

export default SynonymList;
