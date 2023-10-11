package cs.upce.fei.nnpda.sem_a_v01.repository;

import cs.upce.fei.nnpda.sem_a_v01.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}
