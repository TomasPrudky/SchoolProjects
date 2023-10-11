package cs.upce.fei.nnpda.sem_a_v01.service;

import cs.upce.fei.nnpda.sem_a_v01.entity.Device;
import cs.upce.fei.nnpda.sem_a_v01.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    public Device findById(Integer id) {
        return deviceRepository.findById(id.longValue())
                .orElseThrow(()-> new RuntimeException(String.format("Device was not found!", id)));
    }

    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    public void deleteById(Integer id) {
        deviceRepository.deleteById(id.longValue());
    }
}
