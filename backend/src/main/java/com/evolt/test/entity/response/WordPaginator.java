package com.evolt.test.entity.response;

import java.util.List;

public class WordPaginator {
    private List<String> words;
    private Integer count;

    public WordPaginator(List<String> words, Integer count) {
        this.words = words;
        this.count = count;
    }

    public List<String> getWords() {
        return words;
    }

    public void setWords(List<String> words) {
        this.words = words;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
