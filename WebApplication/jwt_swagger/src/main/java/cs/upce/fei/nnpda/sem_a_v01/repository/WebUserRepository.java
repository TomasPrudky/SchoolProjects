package cs.upce.fei.nnpda.sem_a_v01.repository;

import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebUserRepository extends JpaRepository<WebUser, Long> {

    WebUser findWebUserByEmail(String email);
}
