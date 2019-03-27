import React from 'react';
import {shallow} from "enzyme";
import {WithLoading} from "../WithLoading";
import {getSafeDeep} from "../../Utility/state";
import SynonymList from "../../SynonymList/SynonymList";

describe('With Loading', function () {
    it('should render correctly', function () {
        const SynonymListWithLoading = WithLoading(SynonymList);
        const component = shallow(
            <SynonymListWithLoading
                isLoading={true}  />
        ).dive();
        expect(component).toMatchSnapshot();
    });

    it('should show spinner', async function() {
        const SynonymListWithLoading = WithLoading(SynonymList);
        const component = shallow(
            <SynonymListWithLoading
                isLoading={false}  />
        );
        component.setProps({isLoading: true});

        await new Promise(resolve => setTimeout(resolve, 210));

            expect(component.state("hidden")).toEqual(false);
    });

    it('should hide spinner', async function() {
        const SynonymListWithLoading = WithLoading(SynonymList);
        const component = shallow(
            <SynonymListWithLoading
                isLoading={true}  />
        );
        component.setProps({isLoading: false});


        expect(component.state("hidden")).toEqual(true);
    });
});
