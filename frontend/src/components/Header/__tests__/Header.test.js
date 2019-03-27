import React from 'react';
import {shallow} from "enzyme";
import Header from "../Header";

describe('Search Box', function () {
    it('should render correctly', function () {
        const component = shallow(
            <Header />
        );
        expect(component).toMatchSnapshot();
    });

});
