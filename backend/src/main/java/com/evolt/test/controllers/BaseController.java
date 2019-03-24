package com.evolt.test.controllers;

import com.evolt.test.services.GraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @Autowired
    private GraphService graphService;

    public GraphService getGraphService() {
        return graphService;
    }
}
