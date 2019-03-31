package com.evolt.test.services;

import com.evolt.test.entity.Word;
import com.evolt.test.entity.response.WordPaginator;
import com.evolt.test.util.SynonymGraph;
import org.jgrapht.Graphs;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class GraphService implements ServiceInterface {

    private SynonymGraph graph = new SynonymGraph();


    @Override
    public void addWord(Word word) {
        String stemmedName = filter(word.getValue());
        graph.addVertex(stemmedName);

        for (String synonym : word.getSynonyms()) {
            String stemmedSynonym = filter(synonym);

            if (!stemmedSynonym.equals(stemmedName) && graph.getEdge(stemmedSynonym, stemmedName) == null) {
                graph.addVertex(stemmedSynonym);
                graph.addEdge(stemmedName, stemmedSynonym);
            }
        }
    }

    @Override
    public Set<String> getLinkedWords(String name) {
        String stemmedName = filter(name);

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
        List<String> subList = graph.getSortedVertexSet()
                .stream()
                .skip(offset)
                .limit(limit)
                .collect(Collectors.toList());

        return new WordPaginator(subList, graph.getSortedVertexSet().size());
    }

    public String filter(String word) {
        return word.toLowerCase();
    }
}
