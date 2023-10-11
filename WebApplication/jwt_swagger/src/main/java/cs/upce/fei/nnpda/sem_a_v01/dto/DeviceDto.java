package cs.upce.fei.nnpda.sem_a_v01.dto;

import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import lombok.Data;

@Data
public class DeviceDto {

    private Long id;
    private String deviceName;
    private String description;
    private WebUser deviceOwner;
}
