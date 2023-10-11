package cs.upce.fei.nnpda.sem_a_v01.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping({"/hello"})
    public String hello(){
        return "Hello world! :)";
    }
}
