package cs.upce.fei.prudkytomas.cookbook.service;

import cs.upce.fei.prudkytomas.cookbook.dto.RecipeDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class RecipeServiceTests {

    @Autowired
    private RecipeService recipeService;

    @Test
    public void testFindAllByNameLike() throws ResourceNotFoundException {
        // Generate a random recipe name
        String name = RandomStringUtils.randomAlphanumeric(10);

        // Create 3 recipes with names containing `name
        RecipeDtoInOut recipe1 = new RecipeDtoInOut(null, name + "1", "description1", "procedure1", 1, 1, 5, 1L, null, new ArrayList<>(), new ArrayList<>());
        RecipeDtoInOut recipe2 = new RecipeDtoInOut(null, name + "2", "description2", "procedure1", 2, 2, 5, 1L, null, new ArrayList<>(), new ArrayList<>());
        RecipeDtoInOut recipe3 = new RecipeDtoInOut(null, name + "3", "description3", "procedure1", 3, 3, 5, 1L, null, new ArrayList<>(), new ArrayList<>());

        // Save the recipes to the database
        recipeService.create(recipe1);
        recipeService.create(recipe2);
        recipeService.create(recipe3);

        // Call the method being tested
        List<RecipeDtoInOut> allRecipes = recipeService.findAllByNameLike(0, 10, name, "name_asc");

        // Verify that the result contains only recipes with names containing `name`
        assertEquals(3, allRecipes.size());
        assertEquals(name + "1", allRecipes.get(0).getName());
        assertEquals(name + "2", allRecipes.get(1).getName());

        // Delete the test data
        recipeService.delete(allRecipes.get(0).getId());
        recipeService.delete(allRecipes.get(1).getId());
        recipeService.delete(allRecipes.get(2).getId());
    }
}
