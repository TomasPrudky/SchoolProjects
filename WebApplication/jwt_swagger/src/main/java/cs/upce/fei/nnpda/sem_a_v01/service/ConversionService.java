package cs.upce.fei.nnpda.sem_a_v01.service;

import cs.upce.fei.nnpda.sem_a_v01.dto.DeviceDto;
import cs.upce.fei.nnpda.sem_a_v01.dto.RecordDto;
import cs.upce.fei.nnpda.sem_a_v01.dto.SensorDto;
import cs.upce.fei.nnpda.sem_a_v01.dto.WebUserDto;
import cs.upce.fei.nnpda.sem_a_v01.entity.Device;
import cs.upce.fei.nnpda.sem_a_v01.entity.Sensor;
import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.entity.Record;

public class ConversionService {

    public static WebUser toWebUser(WebUserDto dto){
        WebUser webUser = new WebUser();
        webUser.setId(dto.getId());
        webUser.setPassword(dto.getPassword());
        webUser.setEmail(dto.getEmail());
        return webUser;
    }

    public static WebUserDto toWebUserDto(WebUser webUser){
        WebUserDto dto = new WebUserDto();
        dto.setId(webUser.getId());
        dto.setEmail(webUser.getEmail());
        dto.setPassword(webUser.getPassword());
        return dto;
    }

    public static DeviceDto toDeviceDto(Device device) {
        DeviceDto dto = new DeviceDto();
        dto.setId(device.getId());
        dto.setDeviceName(device.getDeviceName());
        dto.setDescription(device.getDescription());
        dto.setDeviceOwner(device.getDeviceOwner());
        return dto;
    }

    public static Device toDevice(DeviceDto dto){
        Device device = new Device();
        device.setId(dto.getId());
        device.setDeviceName(dto.getDeviceName());
        device.setDescription(dto.getDescription());
        device.setDeviceOwner(dto.getDeviceOwner());
        return device;
    }

    public static SensorDto toSensorDto(Sensor sensor) {
        SensorDto dto = new SensorDto();
        dto.setId(sensor.getId());
        dto.setSensorName(sensor.getSensorName());
        dto.setDeviceSensor(sensor.getDeviceSensor());
        return dto;
    }

    public static Sensor toSensor(SensorDto dto){
        Sensor sensor = new Sensor();
        sensor.setId(dto.getId());
        sensor.setSensorName(dto.getSensorName());
        sensor.setDeviceSensor(dto.getDeviceSensor());
        return sensor;
    }

    public static RecordDto toRecordDto(Record record) {
        RecordDto dto = new RecordDto();
        dto.setId(record.getId());
        dto.setValue(record.getValue());
        dto.setSensorRecord(record.getSensorRecord());
        dto.setTimestamp(record.getTimestamp());
        return dto;
    }

    public static Record toRecord(RecordDto dto) {
        Record record = new Record();
        record.setId(dto.getId());
        record.setValue(dto.getValue());
        record.setTimestamp(dto.getTimestamp());
        record.setSensorRecord(dto.getSensorRecord());
        return record;
    }
}
