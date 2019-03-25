package com.evolt.test.controllers;

import com.evolt.test.entity.Word;
import com.evolt.test.entity.response.WordPaginator;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping(value = "/word")
@CrossOrigin(origins = "*")
@Validated
public class WordController extends BaseController {

    @ApiOperation(value = "Create or update word with synonyms")
    @RequestMapping(method = RequestMethod.POST)
    public void createOrUpdate(@Valid @RequestBody Word word) {
        getGraphService().addWord(word);
    }

    @ApiOperation(value = "Return word object with all synonyms.")
    @RequestMapping(method = RequestMethod.GET)
    public Word get(@Valid @NotBlank @RequestParam String value) {
        return getGraphService().getWordDetails(value);
    }

    @ApiOperation(value = "Return all words.")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public WordPaginator get(@RequestParam(value = "offset", defaultValue = "0") Integer offset,
                             @RequestParam(value = "limit") Integer limit) {
        return getGraphService().getList(offset, limit);
    }
}
