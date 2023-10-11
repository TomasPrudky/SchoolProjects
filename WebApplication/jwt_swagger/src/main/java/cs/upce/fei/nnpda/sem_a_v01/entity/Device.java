package cs.upce.fei.nnpda.sem_a_v01.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;
    private String description;

    @OneToMany(mappedBy = "id")
    @JsonIgnore
    private List<Sensor> sensorList;

    @ManyToOne
    private WebUser deviceOwner;
}
