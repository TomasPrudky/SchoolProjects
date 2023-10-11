package cs.upce.fei.prudkytomas.cookbook.service;

import cs.upce.fei.prudkytomas.cookbook.domain.AppUser;
import cs.upce.fei.prudkytomas.cookbook.domain.Category;
import cs.upce.fei.prudkytomas.cookbook.domain.Ingredient;
import cs.upce.fei.prudkytomas.cookbook.domain.Recipe;
import cs.upce.fei.prudkytomas.cookbook.dto.RecipeDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.repository.AppUserRepository;
import cs.upce.fei.prudkytomas.cookbook.repository.CategoryRepository;
import cs.upce.fei.prudkytomas.cookbook.repository.IngredientRepository;
import cs.upce.fei.prudkytomas.cookbook.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final AppUserRepository appUserRepository;
    private final IngredientRepository ingredientRepository;

    private final CategoryRepository categoryRepository;

    public List<RecipeDtoInOut> findAllRecipes() {
        List<Recipe> list = (List<Recipe>) recipeRepository.findAll();
        List<RecipeDtoInOut> dtoList = new ArrayList<>();

        for(Recipe recipe : list){
            dtoList.add(CoversionService.toDto(recipe));
        }

        return dtoList;
    }

    public RecipeDtoInOut findById(Long id) throws ResourceNotFoundException {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Recipe %s not found!", id)));
        return CoversionService.toDto(recipe);
    }

    @Transactional
    public RecipeDtoInOut create(RecipeDtoInOut recipeDtoInOut) throws ResourceNotFoundException {
        AppUser user = appUserRepository.findById(recipeDtoInOut.getOwner()).orElseThrow(()-> new ResourceNotFoundException(String.format("User %s not found", recipeDtoInOut.getOwner())));

        List<Category> categories = recipeDtoInOut.getCategories();
        List<Ingredient> ingredients = recipeDtoInOut.getIngredients();
        List<String> links = recipeDtoInOut.getLinksToImages();

        Recipe recipe = new Recipe(null,
                recipeDtoInOut.getName(),
                recipeDtoInOut.getDescription(),
                recipeDtoInOut.getProcedure(),
                recipeDtoInOut.getPrepareTime(),
                recipeDtoInOut.getNumberOfPortions(),
                recipeDtoInOut.getRating(),
                links, ingredients, categories, null, user);

        Recipe saveRecipe = recipeRepository.save(recipe);
        System.out.println(categories);

        addRecipeIngredients(saveRecipe, recipe.getIngredients());
        addRecipeCategories(saveRecipe, recipe.getCategories());

        return CoversionService.toDto(saveRecipe);
    }

    private void addRecipeCategories(Recipe recipe, List<Category> categories) {
        for (Category item : categories){
            Category category = categoryRepository.findByName(item.getName());
            category.getRecipes().add(recipe);
            categoryRepository.save(category);
        }
    }

    private void addRecipeIngredients(Recipe recipe, List<Ingredient> ingredients) {
        for (Ingredient item : ingredients) {
            Ingredient ingredient = ingredientRepository.findByName(item.getName());
            ingredient.getRecipes().add(recipe);
            ingredientRepository.save(ingredient);
        }
    }

    public RecipeDtoInOut update(Long id, RecipeDtoInOut dto) throws ResourceNotFoundException {
        if(!dto.getOwner().equals(id)) throw new ResourceNotFoundException("User isnt owner!");

        Recipe recipe = recipeRepository.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Recipe %s not found", id)));

        recipe.setId(dto.getId());
        recipe.setName(dto.getName());
        recipe.setDescription(dto.getDescription());
        recipe.setProcedure(dto.getProcedure());
        recipe.setNumberOfPortions(dto.getNumberOfPortions());
        recipe.setRating(dto.getRating());
        recipe.setLinksToImages(dto.getLinksToImages());
        recipe.setIngredients(dto.getIngredients());
        recipe.setCategories(dto.getCategories());
        recipe.setPrepareTime(dto.getPrepareTime());

        recipeRepository.removeRecipeCategories(recipe.getId());
        recipeRepository.removeRecipeIngredients(recipe.getId());

        addRecipeIngredients(recipe, recipe.getIngredients());
        addRecipeCategories(recipe, recipe.getCategories());

        recipeRepository.save(recipe);

        return CoversionService.toDto(recipe);
    }
    @Transactional
    public void delete(Long id) throws ResourceNotFoundException {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Recipe %s not found", id)));

        recipeRepository.removeRecipeCategories(id);
        recipeRepository.removeRecipeIngredients(id);
        recipe.setOwner(null);
        recipeRepository.save(recipe);
        recipeRepository.delete(recipe);
    }

    public void create(Recipe recipe) {
        recipeRepository.save(recipe);
    }

    public List<RecipeDtoInOut> findRecipesByOwner(Long id) {

        return recipeRepository.findAllByOwner(appUserRepository.findById(id).orElse(null))
                .stream()
                .map(CoversionService::toDto)
                .collect(Collectors.toList());
    }

    public List<RecipeDtoInOut> findFavoriteRecipes(Long id) {
        AppUser appUser = appUserRepository.findById(id).orElse(null);
        return appUser.getFavoriteRecipes().stream().map(CoversionService::toDto).collect(Collectors.toList());
    }

    public void deleteFavorite(Long recipeId, Long userId) {
        recipeRepository.removeFavorites(recipeId, userId);
    }

    public boolean isUserFavorite(Long recipeId, Long userId) {
        return recipeRepository.isUserFavorite(recipeId, userId);
    }
    public Integer getCountOfRecipes() {
        return recipeRepository.getCountOfRecipes();
    }

    public Integer getCountOfRecipesWithName(String name) {
        return recipeRepository.getCountOfRecipesWithName(name);
    }

    public List<RecipeDtoInOut> findAllByPage(Integer page, Integer items, String sort){
        Sort sortObject = getSort(sort);

        return recipeRepository.findAll(PageRequest.of(page, items, sortObject))
                .stream()
                .map(CoversionService::toDto)
                .collect(Collectors.toList());
    }

    public List<RecipeDtoInOut> findAllByNameLike(Integer page, Integer items, String name, String sort){
        Sort sortObject = getSort(sort);

        return recipeRepository.findByNameContaining(PageRequest.of(page, items, sortObject), name)
                .stream()
                .map(CoversionService::toDto)
                .collect(Collectors.toList());
    }

    public void addToFavorite(Long recipeId, Long userId) {
        recipeRepository.addToFavorite(recipeId, userId);
    }

    public Sort getSort(String sort) {
        Sort s;
        switch (sort) {
            case "name_asc":
                s = Sort.by("name").ascending();
                break;
            case "name_dsc":
                s = Sort.by("name").descending();
                break;
            case "rating_asc":
                s = Sort.by("rating").ascending();
                break;
            case "rating_dsc":
            default:
                s = Sort.by("rating").descending();
                break;
        }
        return s;
    }
}
