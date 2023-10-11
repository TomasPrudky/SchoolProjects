package cs.upce.fei.prudkytomas.cookbook.service;

import cs.upce.fei.prudkytomas.cookbook.domain.*;
import cs.upce.fei.prudkytomas.cookbook.dto.*;
import cs.upce.fei.prudkytomas.cookbook.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CoversionService {

    @Autowired
    private static AppUserRepository appUserRepository;

    public static AppUserDtoOut toDto(AppUser appUser){
        return new AppUserDtoOut(appUser.getUsername(), appUser.getEmail());
    }

    public static AppUser toEntity(AppUserDtoIn dto){
        return new AppUser(dto.getUsername(), dto.getPassword(), dto.getEmail());
    }

    public static CategoryDtoInOut toDto(Category category) {
        return new CategoryDtoInOut(category.getId(), category.getName());
    }

    public static Category toEntity(CategoryDtoInOut dto){
        return new Category(dto.getName());
    }

    public static IngredientDtoInOut toDto(Ingredient ingredient) {
        return new IngredientDtoInOut(ingredient.getId(), ingredient.getName());
    }

    public static Ingredient toEntity(IngredientDtoInOut dto){
        return new Ingredient(dto.getName());
    }

    public static RoleDtoInOut toDto(Role role) {
        //return new RoleDtoInOut(role.getName());
        return null;
    }

    public static Role toEntity(RoleDtoInOut dto){
        //return new Role(dto.getName());
        return null;
    }

    public static RecipeDtoInOut toDto(Recipe recipe) {
        return new RecipeDtoInOut(
                recipe.getId(),
                recipe.getName(),
                recipe.getDescription(),
                recipe.getProcedure(),
                recipe.getPrepareTime(),
                recipe.getNumberOfPortions(),
                recipe.getRating(),
                recipe.getOwner().getId(),
                recipe.getLinksToImages(),
                recipe.getIngredients(),
                recipe.getCategories());
    }

    public static Recipe toEntity(RecipeDtoInOut dto) {
        return new Recipe(
                dto.getId(),
                dto.getName(),
                dto.getDescription(),
                dto.getProcedure(),
                dto.getPrepareTime(),
                dto.getNumberOfPortions(),
                dto.getLinksToImages(),
                dto.getIngredients(),
                dto.getCategories(),
                appUserRepository.findById(dto.getOwner()).orElse(null));
    }
}
