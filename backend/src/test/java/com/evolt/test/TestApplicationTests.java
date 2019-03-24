package com.evolt.test;

import com.evolt.test.entity.Word;
import com.evolt.test.services.GraphService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;
import java.util.TreeSet;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestApplicationTests {

    @Autowired
    private GraphService graphService;

    @Before
    public void prepareGraphService() {
        Set<String> synonyms = new TreeSet<>();
        synonyms.add("shower");
        synonyms.add("clean");
        synonyms.add("washing");
        Word wash = new Word("wash", synonyms);

        graphService.addWord(wash);
    }

    @Test
    public void testWashWord() {
        Word washWorld = graphService.getWordDetails("wash");
        Assert.assertTrue(washWorld.getSynonyms().contains("clean"));
    }

    @Test
    public void testCleanWord() {
        Word washWord = graphService.getWordDetails("clean");
        Assert.assertTrue(washWord.getSynonyms().contains("wash"));
    }

   /* @Test
    public void testSynonymsCount() {
        Word washWord = graphService.getWordDetails("wash");
        Assert.assertEquals(washWord.getSynonyms().size(), 2);
    }*/

    @Test
    public void testEmpty() {
        Word notInsertedWord = graphService.getWordDetails("not-inserted-word");
        Assert.assertNull(notInsertedWord.getSynonyms());
    }

    @Test
    public void testDuplicate() {
        String wordOne = "word-one";
        String wordTwo = "word-two";

        Set<String> synonyms = new TreeSet<>();
        synonyms.add(wordTwo);
        synonyms.add(wordOne);
        graphService.addWord(new Word(wordOne, synonyms));
        graphService.addWord(new Word(wordTwo, synonyms));

        Assert.assertEquals(graphService.getLinkedWords(wordOne).size(), 1);
    }
}

