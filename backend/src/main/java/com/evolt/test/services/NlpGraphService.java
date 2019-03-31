package com.evolt.test.services;

import edu.stanford.nlp.process.Morphology;

public class NlpGraphService extends GraphService {
    private Morphology morphology = new Morphology();

    public String filter(String word) {
        return morphology.stem(word.toLowerCase());
    }
}
