package cs.upce.fei.prudkytomas.cookbook.repository;

import cs.upce.fei.prudkytomas.cookbook.domain.Category;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
    Category findByName(String name);
}
