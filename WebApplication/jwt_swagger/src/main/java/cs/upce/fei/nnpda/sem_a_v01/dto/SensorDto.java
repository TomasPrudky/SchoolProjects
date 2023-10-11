package cs.upce.fei.nnpda.sem_a_v01.dto;

import cs.upce.fei.nnpda.sem_a_v01.entity.Device;
import lombok.Data;

@Data
public class SensorDto {

    private Long id;
    private String sensorName;
    private Device deviceSensor;

}
