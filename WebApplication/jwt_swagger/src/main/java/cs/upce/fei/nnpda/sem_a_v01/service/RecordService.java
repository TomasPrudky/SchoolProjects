package cs.upce.fei.nnpda.sem_a_v01.service;

import cs.upce.fei.nnpda.sem_a_v01.repository.RecordRepository;
import org.springframework.stereotype.Service;
import cs.upce.fei.nnpda.sem_a_v01.entity.Record;

import java.util.List;

@Service
public class RecordService {

    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public List<Record> findAll() {
        return recordRepository.findAll();
    }

    public Record findById(Integer id) {
        return recordRepository.findById(id.longValue())
                .orElseThrow(()-> new RuntimeException(String.format("Record was not found!", id)));

    }

    public Record save(Record record) {
        return recordRepository.save(record);
    }

    public void deleteById(Integer id) {
        recordRepository.deleteById(id.longValue());
    }
}
