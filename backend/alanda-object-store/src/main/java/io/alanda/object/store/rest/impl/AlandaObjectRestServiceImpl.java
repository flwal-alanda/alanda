package io.alanda.object.store.rest.impl;

import io.alanda.object.store.dto.AlandaObjectDto;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.rest.AlandaObjectRestService;
import io.alanda.object.store.service.AlandaObjectPropertiesSerivce;
import io.alanda.object.store.service.AlandaObjectService;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.List;

public class AlandaObjectRestServiceImpl implements AlandaObjectRestService {

    @Inject
    private AlandaObjectService alandaObjectService;

    @Inject
    AlandaObjectPropertiesSerivce alandaObjectPropertiesSerivce;

    @Override
    public AlandaObjectDto getObjectById(Long objectGuid) {
        return alandaObjectService.getAlandaObjectByID(objectGuid);
    }

    @Override
    public List<AlandaObjectDto> getAll() {
        return alandaObjectService.getAllAlandaObjects();
    }

    @Override
    public void createObject(List<AlandaObjectPropertiesDto> properties, Long typeId) {
        alandaObjectService.createAlandaObject(typeId,properties);
    }

    @Override
    public List<AlandaObjectDto> getAllFromType(Long typeId) {
        return alandaObjectService.getAllAlandaObjectsByType(typeId);
    }

    @Override
    public AlandaObjectDto updateAlandaObject(AlandaObjectDto alandaObjectDto, Long guid) {
        return alandaObjectService.updateAlandaObject(alandaObjectDto);
    }

}
