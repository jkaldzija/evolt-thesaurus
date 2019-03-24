package com.evolt.test.util;

import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;

import java.util.*;

public class SynonymGraph extends DefaultDirectedGraph<String, DefaultEdge> {
    private TreeSet<String> treeSet = new TreeSet<>();

    public SynonymGraph() {
        super(DefaultEdge.class);
    }

    @Override
    public boolean addVertex(String word) {
        boolean added = super.addVertex(word);
        treeSet.add(word);

        return added;
    }

    @Override
    public boolean removeVertex(String s) {
        treeSet.remove(s);
        return super.removeVertex(s);
    }

    public TreeSet<String> getSortedVertexSet() {
        return treeSet;
    }
}