package cs.upce.fei.prudkytomas.cookbook.controller;

import cs.upce.fei.prudkytomas.cookbook.dto.RecipeDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping()
    public ResponseEntity<List<RecipeDtoInOut>> getRecipes(){
        return ResponseEntity.ok(recipeService.findAllRecipes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDtoInOut> findRecipeById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(recipeService.findById(id));
    }

    @GetMapping("/owner/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<RecipeDtoInOut>> findUserRecipes(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.findRecipesByOwner(id));
    }

    @GetMapping("/favorite/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<RecipeDtoInOut>> findUserFavorites(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.findFavoriteRecipes(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<RecipeDtoInOut> createRecipe(@RequestBody RecipeDtoInOut recipeDtoInOut) throws ResourceNotFoundException {
        return ResponseEntity.ok(recipeService.create(recipeDtoInOut));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<RecipeDtoInOut> updateRecipe(@RequestBody @Validated RecipeDtoInOut recipe, @PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(recipeService.update(id, recipe));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) throws ResourceNotFoundException {
        recipeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{recipeId}/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteFavorite(@PathVariable Long recipeId, @PathVariable Long userId) {
        recipeService.deleteFavorite(recipeId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{recipeId}/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> isRecipeFavorite(@PathVariable Long recipeId, @PathVariable Long userId) {
        return ResponseEntity.ok(recipeService.isUserFavorite(recipeId, userId));
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getCountOfRecipes() {
        return ResponseEntity.ok(recipeService.getCountOfRecipes());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<RecipeDtoInOut>> getPageRecipes(@RequestParam Integer page, @RequestParam Integer items,
                                                               @RequestParam String sort){
        return ResponseEntity.ok(recipeService.findAllByPage(page, items, sort));
    }

    @GetMapping("/str")
    public ResponseEntity<List<RecipeDtoInOut>> findAllByNameLike(@RequestParam String name, @RequestParam Integer page,
                                                                  @RequestParam Integer items, @RequestParam String sort){
        return ResponseEntity.ok(recipeService.findAllByNameLike(page, items, name, sort));
    }

    @GetMapping("/count/str")
    public ResponseEntity<Integer> getCountOfRecipesWithName(@RequestParam String name) {
        return ResponseEntity.ok(recipeService.getCountOfRecipesWithName(name));
    }

    @PostMapping("/{recipeId}/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> addToFavorite(@PathVariable Long recipeId, @PathVariable Long userId) {
        recipeService.addToFavorite(recipeId, userId);
        return ResponseEntity.ok().build();
    }

}
