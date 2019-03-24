import React from 'react';
import {shallow} from "enzyme";
import {apiClient} from "../api/util";
import App from "../App";
import MockAdapter from "axios-mock-adapter";

describe('Application', function () {
    it('should render correctly', function () {
        const component = shallow(
            <App/>
        );
        component.setState({
            word: {
                value: "test",
                synonyms: [
                    "syn1",
                    "syn2",
                    "syn3"
                ]
            }
        });
        expect(component).toMatchSnapshot();
    });
    it('should open dialog on fab click', function () {
        const component = shallow(
            <App/>
        );
        component.instance().toggleAddDialog();
        expect(component.state("addDialogOpen")).toBe(true);
        component.instance().toggleAddDialog();
        expect(component.state("addDialogOpen")).toBe(false);
    });
    it('should handle search', async function () {
        const wordResponse = {
            value: "test",
                synonyms: [
                "syn1",
                "syn2",
                "syn3"
            ]
        };
        const mock = new MockAdapter(apiClient);
        mock.onGet("word", {value: "test"}).reply(200, wordResponse);
        const component = shallow(
            <App/>
        );
        await component.instance().onSubmit("test");
        expect(component.state("word")).toEqual(wordResponse);
    });
});
