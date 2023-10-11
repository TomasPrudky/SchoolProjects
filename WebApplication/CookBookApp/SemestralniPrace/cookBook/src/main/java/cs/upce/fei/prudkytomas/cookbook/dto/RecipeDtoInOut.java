package cs.upce.fei.prudkytomas.cookbook.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cs.upce.fei.prudkytomas.cookbook.domain.AppUser;
import cs.upce.fei.prudkytomas.cookbook.domain.Category;
import cs.upce.fei.prudkytomas.cookbook.domain.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDtoInOut {

    private Long id;
    private String name;

    private String description;

    private String procedure;

    private Integer prepareTime;

    private Integer numberOfPortions;

    private double rating;

    private Long owner;

    private List<String> linksToImages = Collections.emptyList();

    private List<Ingredient> ingredients = Collections.emptyList();

    private List<Category> categories = Collections.emptyList();

    @Override
    public String toString() {
        return "RecipeDtoInOut{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", procedure='" + procedure + '\'' +
                ", prepareTime=" + prepareTime +
                ", numberOfPortions=" + numberOfPortions +
                ", rating=" + rating +
                ", owner=" + owner +
                ", linksToImages=" + linksToImages +
                ", ingredients=" + ingredients +
                ", categories=" + categories +
                '}';
    }
}
