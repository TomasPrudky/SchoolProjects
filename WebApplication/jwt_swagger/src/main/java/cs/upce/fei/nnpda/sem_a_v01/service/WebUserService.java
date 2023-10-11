package cs.upce.fei.nnpda.sem_a_v01.service;

import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.repository.WebUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebUserService {

    private final WebUserRepository webUserRepository;

    public WebUserService(WebUserRepository webUserRepository) {
        this.webUserRepository = webUserRepository;
    }

    public List<WebUser> findAll() {
        return webUserRepository.findAll();
    }

    public WebUser findById(Integer id) {
        return webUserRepository.findById(id.longValue())
                .orElseThrow(()-> new RuntimeException(String.format("User was not found!", id)));
    }

    public WebUser save(WebUser webUser) {
        return webUserRepository.save(webUser);
    }

    public void deleteById(Integer id) {
        webUserRepository.deleteById(id.longValue());
    }

    public WebUser findByEmail(String email) {
        return webUserRepository.findWebUserByEmail(email);
    }
}
