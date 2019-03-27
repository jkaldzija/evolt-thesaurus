import React from 'react';
import {shallow} from "enzyme";
import Home from "../Home";

describe('Search Box', function () {
    it('should render correctly', function () {
        const component = shallow(
            <Home onSubmit={() => {}}/>
        );
        expect(component).toMatchSnapshot();
    });

});
