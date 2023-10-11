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
public class Sensor {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensorName;

    @OneToMany(mappedBy = "id")
    @JsonIgnore
    private List<Record> recordList;

    @ManyToOne
    private Device deviceSensor;

}
