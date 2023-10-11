package cs.upce.fei.nnpda.sem_a_v01.controller;

import cs.upce.fei.nnpda.sem_a_v01.dto.SensorDto;
import cs.upce.fei.nnpda.sem_a_v01.entity.Sensor;
import cs.upce.fei.nnpda.sem_a_v01.service.ConversionService;
import cs.upce.fei.nnpda.sem_a_v01.service.SensorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    private final SensorService sensorService;

    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @GetMapping
    public List<SensorDto> getAllSensors(){
        return sensorService
                .findAll()
                .stream()
                .map(ConversionService::toSensorDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public SensorDto getSensorById(@PathVariable Integer id){
        Sensor sensor = sensorService.findById(id);
        return ConversionService.toSensorDto(sensor);
    }

    @PostMapping
    public SensorDto createSensor(@RequestBody SensorDto dto){
        Sensor sensor = ConversionService.toSensor(dto);
        Sensor save = sensorService.save(sensor);
        return ConversionService.toSensorDto(save);
    }

    @PutMapping("/{id}")
    public SensorDto updateSensor(@PathVariable Integer id, @RequestBody SensorDto dto){
        Sensor sensor = ConversionService.toSensor(dto);
        sensor.setId(id.longValue());
        Sensor save = sensorService.save(sensor);
        return ConversionService.toSensorDto(save);
    }

    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable Integer id){
        sensorService.deleteById(id);
    }
}
