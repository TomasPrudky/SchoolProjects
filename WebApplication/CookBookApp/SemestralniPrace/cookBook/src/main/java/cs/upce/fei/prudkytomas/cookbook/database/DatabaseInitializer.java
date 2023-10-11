package cs.upce.fei.prudkytomas.cookbook.database;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        String[] roles = {"ROLE_USER", "ROLE_MODERATOR", "ROLE_ADMIN"};
        for (String role : roles) {
            int count = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM role WHERE name = ?",
                    new Object[]{role},
                    Integer.class
            );
            if (count == 0) {
                jdbcTemplate.update("INSERT INTO role(name) VALUES(?)", role);
            }
        }
    }
}
