import React from 'react';
import {mount, shallow} from "enzyme";
import SynonymFormItem from "../SynonymFormItem";

describe('Synonym Form Item', () => {
    it('should render correctly', function () {
        const component = shallow(
            <SynonymFormItem value="test" onDelete={() => {}} onChange={() => {}}/>
        );
        expect(component).toMatchSnapshot();
    });
    it('should handle text input', function () {
        const changeCallback = jest.fn();
        const component = mount(
            <SynonymFormItem value="test" onDelete={() => {}} onChange={changeCallback}/>
        );
        component.find("input").simulate('change', {target: {value: "test"}});
        expect(changeCallback).toHaveBeenCalledWith("test")
    });
    it('should handle delete', function () {
        const deleteCallback = jest.fn();
        const component = mount(
            <SynonymFormItem value="test" onDelete={deleteCallback} onChange={() => {}}/>
        );
        component.find("button").simulate('click');
        expect(deleteCallback).toHaveBeenCalled();
    });
});
