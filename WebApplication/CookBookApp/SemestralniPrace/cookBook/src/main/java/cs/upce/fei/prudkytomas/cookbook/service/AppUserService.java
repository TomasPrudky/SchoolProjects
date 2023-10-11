package cs.upce.fei.prudkytomas.cookbook.service;

import cs.upce.fei.prudkytomas.cookbook.domain.AppUser;
import cs.upce.fei.prudkytomas.cookbook.domain.Recipe;
import cs.upce.fei.prudkytomas.cookbook.domain.Role;
import cs.upce.fei.prudkytomas.cookbook.dto.AppUserDtoIn;
import cs.upce.fei.prudkytomas.cookbook.dto.AppUserDtoOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.repository.AppUserRepository;
import cs.upce.fei.prudkytomas.cookbook.repository.RecipeRepository;
import cs.upce.fei.prudkytomas.cookbook.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;

    private final RecipeRepository recipeRepository;

    @Transactional
    public AppUserDtoOut create(AppUserDtoIn dto){
        AppUser appUser =  appUserRepository.save(CoversionService.toEntity(dto));
        return CoversionService.toDto(appUser);
    }

    public List<AppUserDtoOut> getAllAppUsers() {
        List<AppUser> list = (List<AppUser>) appUserRepository.findAll();
        List<AppUserDtoOut> dtoList = new ArrayList<>();

        for (AppUser appUser:list) {
            dtoList.add(CoversionService.toDto(appUser));
        }

        return dtoList;
    }

    public AppUserDtoOut findById(Long id) throws ResourceNotFoundException {
        AppUser appUser = appUserRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("User %s not found!", id)));
        return CoversionService.toDto(appUser);
    }

    public AppUserDtoOut update(Long id, AppUserDtoIn appUserDtoIn) throws ResourceNotFoundException {
        AppUser appUser = appUserRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("User %s not found!", id)));
        appUser.setUsername(appUserDtoIn.getUsername());
        appUser.setPassword(appUserDtoIn.getPassword());
        appUser.setEmail(appUserDtoIn.getEmail());
        appUserRepository.save(appUser);
        return CoversionService.toDto(appUserRepository.save(appUser));
    }

    public void delete(Long id) throws ResourceNotFoundException {
        appUserRepository.delete(appUserRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("User %s not found!", id))));
    }

    public void addAppUserRole(){
        AppUser appUser = appUserRepository.findById(1L).orElseThrow();
        Role role = roleRepository.findById(1L).orElseThrow();
        //role.getUsers().add(appUser);
        roleRepository.save(role);
    }

    public void addAppUserFavoriteRecipe(){
        AppUser appUser = appUserRepository.findById(1L).orElseThrow();
        Recipe recipe = recipeRepository.findById(2L).orElseThrow();
        recipe.getUsers().add(appUser);
        recipeRepository.save(recipe);
    }
}
