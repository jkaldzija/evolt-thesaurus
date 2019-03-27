import {apiClient} from "./util";
import {AxiosPromise, AxiosResponse} from "axios";
import type {Word, WordListPage} from "./types";

// Define API paths in constants
export const WORD_PATH = "word";
export const WORD_LIST_PATH = "word/list";


export default {

    //List all synonyms for a word
    getSynonymsForWord: (value: string): AxiosPromise<AxiosResponse<Word>> => apiClient.get(WORD_PATH, {
        params: {
            value
        }
    }),

    // Create/Update a word with its synonyms
    createWord: (word: Word): AxiosPromise<AxiosResponse<string>> => apiClient.post(WORD_PATH, word),

    // List the words in the dictionary with pagination
    listWordsPaginated: (offset: number, limit: number): AxiosPromise<AxiosResponse<WordListPage>> => apiClient.get(WORD_LIST_PATH, {
        params: {
            offset,
            limit
        }
    })
}
