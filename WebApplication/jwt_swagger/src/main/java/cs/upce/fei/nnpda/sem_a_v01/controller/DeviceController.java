package cs.upce.fei.nnpda.sem_a_v01.controller;

import cs.upce.fei.nnpda.sem_a_v01.dto.DeviceDto;
import cs.upce.fei.nnpda.sem_a_v01.entity.Device;
import cs.upce.fei.nnpda.sem_a_v01.service.ConversionService;
import cs.upce.fei.nnpda.sem_a_v01.service.DeviceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping()
    public List<DeviceDto> getAllDevices(){
        return  deviceService.findAll().stream().map(ConversionService::toDeviceDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DeviceDto getDevice(@PathVariable Integer id){
        Device device = deviceService.findById(id);
        return ConversionService.toDeviceDto(device);
    }

    @PostMapping
    public DeviceDto createDevice(@RequestBody DeviceDto deviceDto){
        Device device = ConversionService.toDevice(deviceDto);
        Device deviceToSave = deviceService.save(device);
        return ConversionService.toDeviceDto(deviceToSave);
    }

    @PutMapping("/{id}")
    public DeviceDto updateDevice(@PathVariable Integer id, @RequestBody DeviceDto deviceDto){
        Device device = ConversionService.toDevice(deviceDto);
        device.setId(id.longValue());
        Device deviceToSave = deviceService.save(device);
        return ConversionService.toDeviceDto(deviceToSave);
    }

    @DeleteMapping
    public void deleteDevice(@PathVariable Integer id){
        deviceService.deleteById(id);
    }
}
