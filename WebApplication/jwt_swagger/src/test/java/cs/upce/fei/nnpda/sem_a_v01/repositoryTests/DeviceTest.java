package cs.upce.fei.nnpda.sem_a_v01.repositoryTests;

import cs.upce.fei.nnpda.sem_a_v01.entity.Device;
import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.repository.DeviceRepository;
import cs.upce.fei.nnpda.sem_a_v01.repository.WebUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DeviceTest {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private WebUserRepository webUserRepository;

    @Test
    void createAndSaveDeviceTest() {
        Device device = new Device();
        device.setDescription("Teploměr teploty v obývacím pokoji");
        device.setDeviceName("Device001");
        device.setDeviceOwner(webUserRepository.getReferenceById(1L));
        deviceRepository.save(device);
    }

}
