package com.evolt.test.services;

import com.evolt.test.entity.Word;
import com.evolt.test.entity.response.WordPaginator;

import java.util.Set;

public interface ServiceInterface {

    void addWord(Word word);

    Set<String> getLinkedWords(String name);

    WordPaginator getList(Integer offset, Integer limit);

    Word getWordDetails(String name);
}
