package cs.upce.fei.nnpda.sem_a_v01.repositoryTests;

import cs.upce.fei.nnpda.sem_a_v01.entity.Sensor;
import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.repository.DeviceRepository;
import cs.upce.fei.nnpda.sem_a_v01.repository.SensorRepository;
import cs.upce.fei.nnpda.sem_a_v01.repository.WebUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SensorTest {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Test
    void createAndSaveSensorTest() {
        Sensor sensor = new Sensor();
        sensor.setSensorName("Teplomer A023");
        sensor.setDeviceSensor(deviceRepository.getReferenceById(1L));
        sensorRepository.save(sensor);
    }

}
