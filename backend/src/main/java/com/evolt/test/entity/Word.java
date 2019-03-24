package com.evolt.test.entity;

import javax.validation.constraints.NotNull;
import java.util.Set;

public class Word {
    private String value;
    private Set<String> synonyms;

    public Word(String value) {
        this.value = value;
    }

    public Word(String value, Set<String> synonyms) {
        this.value = value;
        this.synonyms = synonyms;
    }

    @NotNull
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @NotNull
    public Set<String> getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(Set<String> synonyms) {
        this.synonyms = synonyms;
    }
}
