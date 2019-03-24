import * as qs from "qs";

export const routes = {
    home:{
        path: '/'
    },
    dictionary:{
        path: '/dictionary'
    }
};

export function redirect(history, route){
    history.push(route);
}

export function getSynonymRoute(synonym){
    return `${routes.home.path}?q=${synonym}`;
}

export function getQueryParam(query, param){
    return qs.parse(query, { ignoreQueryPrefix: true })[param];
}
