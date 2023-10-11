package cs.upce.fei.prudkytomas.cookbook.controller;

import cs.upce.fei.prudkytomas.cookbook.dto.IngredientDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.dto.RoleDtoInOut;
import cs.upce.fei.prudkytomas.cookbook.errors.ResourceNotFoundException;
import cs.upce.fei.prudkytomas.cookbook.service.IngredientService;
import cs.upce.fei.prudkytomas.cookbook.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@RequestMapping("/role")
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDtoInOut>> getRole(){
        return ResponseEntity.ok(roleService.findAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDtoInOut> findRoleById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(roleService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<RoleDtoInOut> createRole(@RequestBody @Validated RoleDtoInOut dto){
        return ResponseEntity.ok(roleService.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<RoleDtoInOut> updateRole(@RequestBody @Validated RoleDtoInOut dto, @PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(roleService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteRole(@PathVariable Long id) throws ResourceNotFoundException {
        roleService.delete(id);
        return ResponseEntity.ok().build();
    }
}
