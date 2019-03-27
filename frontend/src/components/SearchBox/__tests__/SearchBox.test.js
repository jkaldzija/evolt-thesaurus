import React from 'react';
import {shallow} from "enzyme";
import SearchBox from "../SearchBox";
import {MemoryRouter, Route} from "react-router";
import MockAdapter from "axios-mock-adapter";
import {apiClient} from "../../../api/util";

describe('Search Box', function () {
    it('should render correctly', function () {
        const component = shallow(
            <MemoryRouter>
                <SearchBox onSubmit={() => {}}/>
            </MemoryRouter>
        ).dive().dive().dive().dive();
        expect(component).toMatchSnapshot();
    });

    it('should handle input change', function () {
        const component = shallow(
            <MemoryRouter>
                <SearchBox onSubmit={() => {}}/>
            </MemoryRouter>
        ).dive().dive().dive().dive();
        component.instance().onInput({target: {name: "search", value: "test"}});
        expect(component.state("search")).toBe("test")
    });

    it('should send submit event', function () {
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/" component={SearchBox} />

            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();
        const value = "test";
        component.instance().setState({search: value});
        component.instance().onSearch({preventDefault: () => {}});
        expect(router.prop("history").location.search).toEqual(`?q=${value}`);
    });

    it('should perform search correctly', async function () {
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/" component={SearchBox} />
            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();
        component.setState({
            search: "test"
        });
        const mock = new MockAdapter(apiClient);
        mock.onGet('word').reply(200, {
            value: "test",
            synonyms: []
        });
        await component.instance().performSearch();
        expect(component.state("currentWord").value).toEqual("test");
    });

    it('should reload data correctly', async function () {
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/" component={SearchBox} />
            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();
        component.setState({
            search: "test"
        });
        const mock = new MockAdapter(apiClient);
        mock.onGet('word').reply(200, {
            value: "test",
            synonyms: []
        });
        await component.instance().performSearch();
        const firstSearch = component.state("currentWord").value;
        await component.instance().reloadData();
        expect(component.state("currentWord").value).toEqual(firstSearch);
    });

    it('should perform search on query change', async function(){
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/" component={SearchBox} />
            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();

        component.setState({
            search: "test"
        });
        await component.instance().performSearch();

        const mock = new MockAdapter(apiClient);
        mock.onGet('word').reply(200, {
            value: "test",
            synonyms: []
        });

        const value = "test2";
        mock.onGet('word').reply(200, {
            value,
            synonyms: []
        });
        //await router.prop("history").push(`/?q=${value}`);
        component.setProps({
            location:{
                search:"?q=test2"
            }
        });
        await component.instance().performSearch();
        expect(component.state("currentWord").value).toEqual(value);
    });
});
