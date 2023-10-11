package cs.upce.fei.nnpda.sem_a_v01.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double value;
    private LocalDateTime timestamp;

    @ManyToOne
    private Sensor sensorRecord;
}
