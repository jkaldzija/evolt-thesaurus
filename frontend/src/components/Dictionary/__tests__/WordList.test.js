import React from 'react';
import {shallow} from "enzyme";
import DictionaryView from "../DictionaryView";
import {MemoryRouter, Route} from "react-router";
import SearchBox from "../../SearchBox/SearchBox";
import MockAdapter from "axios-mock-adapter";
import {apiClient} from "../../../api/util";
import {WORD_LIST_PATH} from "../../../api/wordService";
import WordList from "../WordList";

describe('Word List', function () {
    it('should render correctly', function () {
        const component = shallow(
            <MemoryRouter>
                <WordList />
            </MemoryRouter>
        ).dive().dive().dive().dive();
        expect(component).toMatchSnapshot();
    });

    it('should build proper pagination links', function () {
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/" component={WordList} />

            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();

        expect(component.instance().buildPaginationLink(2)).toEqual(`/?page=2`);
        // expect(router.prop("history").location.search).toEqual(`?q=${value}`);
    });

    it('should switch pages properly', function () {
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/" component={WordList} />

            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();
        component.instance().handlePageClick({selected: 3});
        expect(router.prop("history").location.search).toEqual(`?page=${3}`);
    });


});
