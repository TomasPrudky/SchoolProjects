package cs.upce.fei.nnpda.sem_a_v01.security;

import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.service.WebUserService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final WebUserService webUserService;

    public MyUserDetailsService(WebUserService webUserService) {
        this.webUserService = webUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        WebUser webUser = webUserService.findByEmail(username);
        return new User(webUser.getEmail(), webUser.getPassword(), new ArrayList<>());
    }
}
