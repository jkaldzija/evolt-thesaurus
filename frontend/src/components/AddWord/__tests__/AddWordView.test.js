import React from 'react';
import {shallow} from "enzyme";
import AddWordView from "../AddWordView";

describe('Add Word Dialog', function () {
    it('should render correctly', function () {
        const component = shallow(
            <AddWordView />
        );
        expect(component).toMatchSnapshot();
    });

    it('should toggle dialog properly', function (){
        const word = {
            value: "word",
            synonyms: null
        };
        const component = shallow(
            <AddWordView />
        );

        component.instance().toggleDialog("addSynonym")();
        expect(component.state("addSynonymDialogOpen")).toEqual(true);
        component.instance().toggleDialog("addSynonym")();
        expect(component.state("addSynonymDialogOpen")).toBe(false);
    });

});
