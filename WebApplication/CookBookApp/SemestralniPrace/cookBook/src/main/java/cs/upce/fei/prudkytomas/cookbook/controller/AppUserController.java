package cs.upce.fei.prudkytomas.cookbook.controller;

import cs.upce.fei.prudkytomas.cookbook.dto.AppUserDtoIn;
import cs.upce.fei.prudkytomas.cookbook.dto.AppUserDtoOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping
    public ResponseEntity<?> getAppUsers(){
        return ResponseEntity.ok(appUserService.getAllAppUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(appUserService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<AppUserDtoOut> createAppUser(@RequestBody @Validated AppUserDtoIn appUserDtoIn){
        return ResponseEntity.ok(appUserService.create(appUserDtoIn));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<AppUserDtoOut> updateAppUser(@RequestBody @Validated AppUserDtoIn appUserDtoIn, @PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(appUserService.update(id, appUserDtoIn));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteAppUser(@PathVariable Long id) throws ResourceNotFoundException {
        appUserService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        appUserService.addAppUserRole();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favorite")
    public ResponseEntity<?> favorite(){
        appUserService.addAppUserFavoriteRecipe();
        return ResponseEntity.ok().build();
    }
}
