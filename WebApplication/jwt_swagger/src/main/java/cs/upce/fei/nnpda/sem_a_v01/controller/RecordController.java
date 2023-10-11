package cs.upce.fei.nnpda.sem_a_v01.controller;

import cs.upce.fei.nnpda.sem_a_v01.dto.RecordDto;
import cs.upce.fei.nnpda.sem_a_v01.entity.Record;
import cs.upce.fei.nnpda.sem_a_v01.service.ConversionService;
import cs.upce.fei.nnpda.sem_a_v01.service.RecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping
    public List<RecordDto> getAllRecords(){
        return recordService
                .findAll()
                .stream()
                .map(ConversionService::toRecordDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public RecordDto getRecordById(@PathVariable Integer id){
        Record record = recordService.findById(id);
        return ConversionService.toRecordDto(record);
    }

    @PostMapping
    public RecordDto createRecord(@RequestBody RecordDto dto){
        Record record = ConversionService.toRecord(dto);
        Record save = recordService.save(record);
        return ConversionService.toRecordDto(save);
    }

    @PutMapping("/{id}")
    public RecordDto updateRecord(@PathVariable Integer id, @RequestBody RecordDto dto){
        Record record = ConversionService.toRecord(dto);
        record.setId(id.longValue());
        Record save = recordService.save(record);
        return ConversionService.toRecordDto(save);
    }

    @DeleteMapping
    public void deleteRecord(@PathVariable Integer id){
        recordService.deleteById(id);
    }
}
