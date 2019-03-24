import React from 'react';
import {shallow} from "enzyme";
import SynonymList from "../SynonymList";

describe('Synonym List', function () {
    it('should render correctly', function () {
        const word = {
            value: "word",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        };

        const component = shallow(
            <SynonymList word={word}/>
        );

        expect(component).toMatchSnapshot();
    });
    it('should render correctly for empty', function () {
        const word = {
            value: "word",
            synonyms: null
        };

        const component = shallow(
            <SynonymList word={word}/>
        );

        expect(component).toMatchSnapshot();
    });
});
