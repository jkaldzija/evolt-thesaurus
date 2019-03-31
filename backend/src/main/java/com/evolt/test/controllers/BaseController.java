package com.evolt.test.controllers;

import com.evolt.test.services.ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @Autowired
    private ServiceInterface graphService;

    public ServiceInterface getGraphService() {
        return graphService;
    }

}
