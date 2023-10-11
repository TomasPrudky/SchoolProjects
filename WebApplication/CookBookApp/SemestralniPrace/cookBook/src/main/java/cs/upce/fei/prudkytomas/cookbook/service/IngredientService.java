package cs.upce.fei.prudkytomas.cookbook.service;

import cs.upce.fei.prudkytomas.cookbook.domain.Ingredient;
import cs.upce.fei.prudkytomas.cookbook.dto.CategoryDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.dto.IngredientDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.repository.IngredientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public List<IngredientDtoInOut> findAllCategories() {
        List<Ingredient> list = (List<Ingredient>) ingredientRepository.findAll();
        List<IngredientDtoInOut> dtoList = new ArrayList<>();
        for (Ingredient item:list) {
            dtoList.add(CoversionService.toDto(item));
        }
        return dtoList;
    }

    public IngredientDtoInOut findById(Long id) throws ResourceNotFoundException {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Ingredient %s not found!", id)));
        return CoversionService.toDto(ingredient);
    }

    public IngredientDtoInOut create(IngredientDtoInOut category) {
        return CoversionService.toDto(ingredientRepository.save(CoversionService.toEntity(category)));
    }

    public IngredientDtoInOut update(Long id, IngredientDtoInOut dto) throws ResourceNotFoundException {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Ingredient %s not found", id)));
        ingredient.setName(dto.getName());
        ingredientRepository.save(ingredient);
        return CoversionService.toDto(ingredient);
    }

    public void delete(Long id) throws ResourceNotFoundException {
        ingredientRepository.delete(ingredientRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException(String.format("Ingredient %s not found!", id))));
    }

    public void delete(String name) {
        ingredientRepository.deleteByNameEquals(name);
    }
}
