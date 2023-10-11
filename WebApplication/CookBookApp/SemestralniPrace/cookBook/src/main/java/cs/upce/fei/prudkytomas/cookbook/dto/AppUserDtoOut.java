package cs.upce.fei.prudkytomas.cookbook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDtoOut {

    @NotBlank
    private String username;

    @NotBlank
    private String email;

}
