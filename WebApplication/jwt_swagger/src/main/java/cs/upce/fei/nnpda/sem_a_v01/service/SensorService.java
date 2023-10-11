package cs.upce.fei.nnpda.sem_a_v01.service;

import cs.upce.fei.nnpda.sem_a_v01.entity.Sensor;
import cs.upce.fei.nnpda.sem_a_v01.repository.SensorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;

    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> findAll() {
        return sensorRepository.findAll();
    }

    public Sensor findById(Integer id) {
        return sensorRepository.findById(id.longValue())
                .orElseThrow(()-> new RuntimeException(String.format("Sensor was not found!", id)));
    }

    public Sensor save(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public void deleteById(Integer id) {
        sensorRepository.deleteById(id.longValue());
    }

}
