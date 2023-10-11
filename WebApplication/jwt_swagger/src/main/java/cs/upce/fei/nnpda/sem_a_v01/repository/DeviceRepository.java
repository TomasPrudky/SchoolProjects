package cs.upce.fei.nnpda.sem_a_v01.repository;

import cs.upce.fei.nnpda.sem_a_v01.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}
