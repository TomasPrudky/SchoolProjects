package cs.upce.fei.prudkytomas.cookbook.service;

import cs.upce.fei.prudkytomas.cookbook.domain.Category;
import cs.upce.fei.prudkytomas.cookbook.dto.CategoryDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryDtoInOut findById(Long id) throws ResourceNotFoundException {
        return CoversionService.toDto(categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("Category %s not found!", id))));
    }

    public List<CategoryDtoInOut> findAllCategories() {
        List<Category> list = (List<Category>) categoryRepository.findAll();
        List<CategoryDtoInOut> dtoList = new ArrayList<>();

        for (Category category:list) {
            dtoList.add(CoversionService.toDto(category));
        }
        return dtoList;
    }

    public CategoryDtoInOut create(CategoryDtoInOut category) {
        return CoversionService.toDto(categoryRepository.save(CoversionService.toEntity(category)));
    }

    public CategoryDtoInOut update(Long id, CategoryDtoInOut categoryDtoInOut) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("Category %s not found!", id)));
        category.setName(categoryDtoInOut.getName());
        categoryRepository.save(category);
        return CoversionService.toDto(categoryRepository.save(category));
    }

    public void delete(Long id) throws ResourceNotFoundException {
        categoryRepository.delete(categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("Category %s not found!", id))));
    }
}
