import {apiClient} from "./util";
import {AxiosPromise, AxiosResponse} from "axios";
import type {Word} from "./types";

const WORD_PATH = "word";
const WORD_LIST_PATH = "word/list";


export default {
    getSynonymsForWord: (value: string): AxiosPromise<AxiosResponse<Word>> => apiClient.get(WORD_PATH, {
        params: {
            value
        }
    }),
    createWord: (word: Word): AxiosPromise<AxiosResponse<string>> => apiClient.post(WORD_PATH, word),
    listWordsPaginated: (offset: number, limit: number): AxiosPromise<AxiosResponse<Array<Word>>> => apiClient.get(WORD_LIST_PATH, {
        params: {
            offset,
            limit
        }
    })
}
