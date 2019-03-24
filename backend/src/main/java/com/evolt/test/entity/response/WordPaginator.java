package com.evolt.test.entity.response;

import java.util.Set;

public class WordPaginator {
    private Set<String> words;
    private Integer count;

    public WordPaginator(Set<String> words, Integer count) {
        this.words = words;
        this.count = count;
    }

    public Set<String> getWords() {
        return words;
    }

    public void setWords(Set<String> words) {
        this.words = words;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
