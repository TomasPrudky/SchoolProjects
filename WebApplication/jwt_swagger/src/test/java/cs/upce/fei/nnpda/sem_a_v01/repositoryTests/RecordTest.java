package cs.upce.fei.nnpda.sem_a_v01.repositoryTests;

import cs.upce.fei.nnpda.sem_a_v01.repository.RecordRepository;
import cs.upce.fei.nnpda.sem_a_v01.repository.SensorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import cs.upce.fei.nnpda.sem_a_v01.entity.Record;

import java.time.LocalDateTime;

@SpringBootTest
class RecordTest {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private RecordRepository recordRepository;

    @Test
    void createAndSaveRecordTest() {
        Record record = new Record();
        record.setTimestamp(LocalDateTime.now());
        record.setValue(23);
        record.setSensorRecord(sensorRepository.getReferenceById(1L));
        recordRepository.save(record);
    }

}
