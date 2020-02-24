package io.alanda.object.store.service;

import io.alanda.object.store.dto.AlandaObjectDto;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.entity.AlandaObject;

import java.util.List;

public interface AlandaObjectService {

    List<AlandaObjectDto> getAllAlandaObjectsByType(Long typeID);
    AlandaObjectDto getAlandaObjectByID(Long guID);
    List<AlandaObjectDto> getAllAlandaObjects();
    void createAlandaObject(Long typeID, List<AlandaObjectPropertiesDto> properties);
    AlandaObjectDto updateAlandaObject(AlandaObjectDto alandaObjectDto);
}
