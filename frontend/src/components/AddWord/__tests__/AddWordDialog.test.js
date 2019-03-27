import React from 'react';
import {shallow} from "enzyme";
import {apiClient} from "../../../api/util";
import AddWordDialog from "../AddWordDialog";
import MockAdapter from 'axios-mock-adapter';

describe('Add Word Dialog', function () {
    it('should render correctly', function () {
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={() => {}}/>
        );
        component.setState({
            value: "test",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        });
        expect(component).toMatchSnapshot();
    });

    it('should handle input change', function () {
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={() => {}}/>
        );
        component.instance().handleWordChange({target: {value: "test"}});
        expect(component.state("value")).toBe("test");
    });

    it('should handle adding synonyms', function () {
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={() => {}}/>
        );
        component.instance().addSynonym();
        expect(component.state("synonyms").length).toBe(1);
    });

    it('should handle removing synonyms', function () {
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={() => {}}/>
        );
        component.setState({
            value: "test",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        });
        component.instance().removeSynonym(1)();
        expect(component.state("synonyms").length).toBe(2);
    });

    it('should handle synonym input', function () {
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={() => {}}/>
        );
        component.setState({
            value: "test",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        });
        component.instance().handleSynonymChange(1)("test");
        expect(component.state("synonyms")[1]).toBe("test");
    });

    it('should reset state on close', function () {
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={() => {}}/>
        );
        component.setState({
            value: "test",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        });
        component.instance().onClose();
        expect(component.state()).toEqual({
            value: "",
            synonyms: []
        });
    });
    it('should handle sending new word request', async function () {
        const wordData = {
            value: "test",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        };
        const closeCallback = jest.fn();
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={closeCallback}/>
        );
        component.setState(wordData);
        const mock = new MockAdapter(apiClient);
        mock.onPost('word', wordData).reply(200, "success");
        component.instance().onSave({preventDefault: () => {}});
        setTimeout(() => {
            expect(closeCallback).toHaveBeenCalled()
        }, 0);


    });
    it('should handle word request errors', async function () {
        const wordData = {
            value: "test",
            synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        };
        const closeCallback = jest.fn();
        const component = shallow(
            <AddWordDialog isOpen={true} toggle={closeCallback}/>
        );
        component.setState(wordData);
        const mock = new MockAdapter(apiClient);
        mock.onPost('word', wordData).reply(400, "error");
        component.instance().onSave({preventDefault: () => {}});
        setTimeout(() => {
            expect(closeCallback).toHaveBeenCalledTimes(0)
        }, 0);
    });
    it('should set passed prop in word field on open/reopen', async function (){
        const component = shallow(
            <AddWordDialog isOpen={false} />
        );
        const value = "test";
        component.setProps({
            isOpen: true,
            word:{
                value,
                synonyms: []
            }
        });
        expect(component.state("value")).toEqual(value);

    });
});
