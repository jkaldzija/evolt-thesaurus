import React from 'react';
import {shallow} from "enzyme";
import DictionaryView from "../DictionaryView";
import {MemoryRouter, Route} from "react-router";
import SearchBox from "../../SearchBox/SearchBox";
import MockAdapter from "axios-mock-adapter";
import {apiClient} from "../../../api/util";
import {WORD_LIST_PATH} from "../../../api/wordService";

describe('Dictionary View', function () {
    it('should render correctly', function () {
        const component = shallow(
            <MemoryRouter>
                <DictionaryView onSubmit={() => {}}/>
            </MemoryRouter>
        ).dive().dive().dive().dive();
        expect(component).toMatchSnapshot();
    });

    it('should load data correctly', async function (){
        const router = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <Route  component={DictionaryView} />
            </MemoryRouter>
        );
        const component = router.dive().dive().dive().dive().dive();

        const response = {
            words: [],
            count: 10
        };
        component.setProps({
            location:{
                search:'?page=1'

            }
        });
        const mock = new MockAdapter(apiClient);
        mock.onGet(WORD_LIST_PATH).reply(200, response);

        await component.instance().loadData();
        expect(component.state("wordCount")).toEqual(response.count);
    });

});
