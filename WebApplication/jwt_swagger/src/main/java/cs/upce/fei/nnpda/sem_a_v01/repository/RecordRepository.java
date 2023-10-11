package cs.upce.fei.nnpda.sem_a_v01.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cs.upce.fei.nnpda.sem_a_v01.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
