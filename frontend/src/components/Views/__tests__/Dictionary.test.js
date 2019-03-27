import React from 'react';
import {shallow} from "enzyme";
import Dictionary from "../Dictionary";

describe('Search Box', function () {
    it('should render correctly', function () {
        const component = shallow(
            <Dictionary onSubmit={() => {}}/>
        );
        expect(component).toMatchSnapshot();
    });

});
