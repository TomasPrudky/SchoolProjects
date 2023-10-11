package cs.upce.fei.nnpda.sem_a_v01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableWebMvc
@EnableSwagger2
@SpringBootApplication
public class SemAV01Application {

    public static void main(String[] args) {
        SpringApplication.run(SemAV01Application.class, args);
    }

}
