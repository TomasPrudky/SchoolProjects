package cs.upce.fei.prudkytomas.cookbook.controller;

import cs.upce.fei.prudkytomas.cookbook.dto.RecipeDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.service.RecipeService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RecipeControllerTest {

    @MockBean
    private RecipeService recipeService;

    @Autowired
    private RecipeController recipeController;

    @Test
    public void testGetCountOfRecipes() {
        // Arrange
        int expectedCount = 84;
        Mockito.when(recipeService.getCountOfRecipes()).thenReturn(expectedCount);

        // Act
        ResponseEntity<Integer> responseEntity = recipeController.getCountOfRecipes();

        // Assert
        Assert.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assert.assertEquals(expectedCount, responseEntity.getBody().intValue());
    }

    @Test
    public void testGetCountOfRecipes_Failure() {
        // Arrange
        Mockito.when(recipeService.getCountOfRecipes()).thenThrow(new RuntimeException("Database unavailable"));

        // Act & Assert
        try {
            recipeController.getCountOfRecipes();
            Assert.fail("Expected RuntimeException, but no exception was thrown");
        } catch (RuntimeException ex) {
            Assert.assertEquals("Database unavailable", ex.getMessage());
        }
    }

    @Test
    public void testFindRecipeById() throws ResourceNotFoundException {
        // Arrange
        Long recipeId = 50L;
        RecipeDtoInOut recipeDto = new RecipeDtoInOut();
        recipeDto.setId(recipeId);
        Mockito.when(recipeService.findById(recipeId)).thenReturn(recipeDto);

        // Act
        ResponseEntity<RecipeDtoInOut> responseEntity = recipeController.findRecipeById(recipeId);

        // Assert
        Assert.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assert.assertEquals(recipeId, responseEntity.getBody().getId());
    }

    @Test
    public void testFindRecipeById_Failure() throws ResourceNotFoundException {
        // Arrange
        Long recipeId = 1L;
        Mockito.when(recipeService.findById(recipeId)).thenThrow(new ResourceNotFoundException("Recipe with id " + recipeId + " not found"));

        // Act and assert
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            recipeController.findRecipeById(recipeId);
        });
        assertEquals("Recipe with id 1 not found", exception.getMessage());
    }

}

