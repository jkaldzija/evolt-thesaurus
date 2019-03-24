package com.evolt.test.services;

import com.evolt.test.entity.Word;
import com.evolt.test.entity.response.WordPaginator;
import com.evolt.test.util.SynonymGraph;
import org.jgrapht.Graphs;

import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

//import edu.stanford.nlp.process.Morphology;

public class GraphService implements ServiceInterface {

    private SynonymGraph graph = new SynonymGraph();


    @Override
    public void addWord(Word word) {

        //Morphology morphology = new Morphology();
        //String stemmedName = morphology.stem(name.toLowerCase());
        String stemmedName = word.getValue().toLowerCase();
        graph.addVertex(stemmedName);

        for (String synonym : word.getSynonyms()) {
            //String stemmedSynonym = morphology.stem(synonym.toLowerCase());
            String stemmedSynonym = synonym.toLowerCase();

            if (!stemmedSynonym.equals(stemmedName) && graph.getEdge(stemmedSynonym, stemmedName) == null) {
                graph.addVertex(stemmedSynonym);
                graph.addEdge(stemmedName, stemmedSynonym);
            }
        }
    }

    @Override
    public Set<String> getLinkedWords(String name) {
        //Morphology morphology = new Morphology();
        //String stemmedName = morphology.stem(name.toLowerCase());
        String stemmedName = name.toLowerCase();

        if (graph.vertexSet().contains(stemmedName)) {
            Set<String> linkedNodes = new TreeSet<>();

            linkedNodes.addAll(Graphs.predecessorListOf(graph, stemmedName));
            linkedNodes.addAll(Graphs.successorListOf(graph, stemmedName));

            return linkedNodes;
        }

        return null;
    }

    @Override
    public Word getWordDetails(String name) {
        return new Word(name, getLinkedWords(name));
    }

    @Override
    public WordPaginator getList(Integer offset, Integer limit) {
        Set<String> subSet = graph.getSortedVertexSet()
                .stream()
                .skip(offset)
                .limit(limit)
                .collect(Collectors.toSet());

        return new WordPaginator(subSet, graph.getSortedVertexSet().size());
    }
}
