import React from 'react';
import {shallow} from "enzyme";
import SearchBox from "../SearchBox";

describe('Search Box', function () {
    it('should render correctly', function () {
        const component = shallow(
            <SearchBox onSubmit={() => {}}/>
        );
        expect(component).toMatchSnapshot();
    });

    it('should handle input change', function () {
        const component = shallow(
            <SearchBox onSubmit={() => {}}/>
        );
        component.instance().handleChange({target: {value: "test"}});
        expect(component.state("word")).toBe("test")
    });

    it('should send submit event', function () {
        const submitCallback = jest.fn();
        const component = shallow(
            <SearchBox onSubmit={submitCallback}/>
        );

        component.instance().setState({word: "test"});
        component.instance().onSubmit({preventDefault: () => {}});
        expect(submitCallback).toHaveBeenCalledWith("test");
    });
});
