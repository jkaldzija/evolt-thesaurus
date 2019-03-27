import React from 'react';
import {shallow} from "enzyme";
import NotFound from "../NotFound";

describe('Not found', function () {
    it('should render correctly', function () {
        const component = shallow(
            <NotFound onSubmit={() => {}}/>
        );
        expect(component).toMatchSnapshot();
    });

});
