package cs.upce.fei.nnpda.sem_a_v01.repositoryTests;

import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.repository.WebUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WebUserTest {

    @Autowired
    private WebUserRepository webUserRepository;

    @Test
    void createAndSaveUserTest() {
        WebUser webUser = new WebUser();
        webUser.setEmail("email@gmail.com");
        webUser.setPassword("Sa5das+-d5D");
        webUserRepository.save(webUser);
    }

    @Test
    void findUserByEmail(){
        WebUser user = webUserRepository.findWebUserByEmail("email@gmail.com");
        System.out.println(user.getEmail());
    }

}
