package io.alanda.object.store.rest.impl;

import io.alanda.object.store.dto.AlandaObjectTypeDto;
import io.alanda.object.store.entity.AlandaObjectType;
import io.alanda.object.store.rest.AlandaObjectTypeRestService;
import io.alanda.object.store.service.AlandaObjectTypeService;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.List;

public class AlandaObjectTypeRestServiceImpl implements AlandaObjectTypeRestService {

    @Inject
    private AlandaObjectTypeService alandaObjectTypeService;

    @Override
    public AlandaObjectTypeDto get(Long typeGuid) {
        return alandaObjectTypeService.getAlandaObjectTypeById(typeGuid);
    }

    @Override
    public List<AlandaObjectTypeDto> getAll() {
        return alandaObjectTypeService.getAllAlandaObjectTypes();
    }

    @Override
    public AlandaObjectTypeDto create(AlandaObjectTypeDto alandaObjectTypeDto) {
        return alandaObjectTypeService.createAlandaObjectType(alandaObjectTypeDto.getName(),alandaObjectTypeDto.getAdditionalPropertyConfig());
    }
}
