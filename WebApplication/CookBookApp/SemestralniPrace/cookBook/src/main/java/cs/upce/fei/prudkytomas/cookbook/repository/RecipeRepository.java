package cs.upce.fei.prudkytomas.cookbook.repository;

import cs.upce.fei.prudkytomas.cookbook.domain.AppUser;
import cs.upce.fei.prudkytomas.cookbook.domain.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RecipeRepository extends PagingAndSortingRepository<Recipe, Long> {

    List<Recipe> findAllByOwner(AppUser owner);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM recipe_category rc WHERE rc.recipe_id=:recipeId", nativeQuery = true)
    void removeRecipeCategories(@Param("recipeId") Long recipeId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM recipe_ingredient rc WHERE rc.recipe_id=:recipeId", nativeQuery = true)
    void removeRecipeIngredients(@Param("recipeId") Long recipeId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM app_user_recipe f WHERE f.recipe_id=:recipeId AND f.app_user_id=:userId", nativeQuery = true)
    void removeFavorites(@Param("recipeId") Long recipeId, @Param("userId") Long userId);

    @Transactional
    @Query(value = "SELECT EXISTS(SELECT 1 FROM app_user_recipe f WHERE f.recipe_id=:recipeId AND f.app_user_id=:userId)", nativeQuery = true)
    boolean isUserFavorite(@Param("recipeId") Long recipeId, @Param("userId") Long userId);

    List<Recipe> findAllByNameContains(String name);

    @Query(value = "SELECT COUNT(*) FROM recipe", nativeQuery = true)
    Integer getCountOfRecipes();

    @Query(value = "SELECT COUNT(*) FROM recipe r WHERE r.name LIKE %:name%", nativeQuery = true)
    Integer getCountOfRecipesWithName(@Param("name") String name);

    Page<Recipe> findAll(Pageable pageable);

    Page<Recipe> findByNameContaining(Pageable pageable, String name);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO app_user_recipe (recipe_id, app_user_id) VALUES (:recipeId, :userId)", nativeQuery = true)
    void addToFavorite(Long recipeId, Long userId);

}
