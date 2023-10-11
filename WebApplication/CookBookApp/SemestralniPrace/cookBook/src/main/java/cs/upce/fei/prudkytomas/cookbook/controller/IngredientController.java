package cs.upce.fei.prudkytomas.cookbook.controller;

import cs.upce.fei.prudkytomas.cookbook.dto.CategoryDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.dto.IngredientDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.service.CategoryService;
import cs.upce.fei.prudkytomas.cookbook.service.IngredientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RequestMapping("/ingredient")
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    public ResponseEntity<List<IngredientDtoInOut>> getIngredients(){
        return ResponseEntity.ok(ingredientService.findAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientDtoInOut> findIngredientById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(ingredientService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<IngredientDtoInOut> createIngredient(@RequestBody @Validated IngredientDtoInOut ingredient){
        return ResponseEntity.ok(ingredientService.create(ingredient));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<IngredientDtoInOut> updateIngredient(@RequestBody @Validated IngredientDtoInOut ingredient, @PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(ingredientService.update(id, ingredient));
    }

    @DeleteMapping()
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteIngredient(@RequestParam(value = "id") Long id) throws ResourceNotFoundException {
        ingredientService.delete(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteIngredient(@PathVariable String name) throws ResourceNotFoundException {
        ingredientService.delete(name);
        return ResponseEntity.ok().build();
    }
}
