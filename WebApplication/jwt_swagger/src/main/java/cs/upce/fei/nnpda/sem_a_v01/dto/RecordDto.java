package cs.upce.fei.nnpda.sem_a_v01.dto;

import cs.upce.fei.nnpda.sem_a_v01.entity.Sensor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecordDto {

    private Long id;
    private double value;
    private LocalDateTime timestamp;
    private Sensor sensorRecord;
}
