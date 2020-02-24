package io.alanda.object.store.service;

import io.alanda.object.store.dto.AlandaObjectDto;
import io.alanda.object.store.dto.AlandaObjectTypeDto;
import io.alanda.object.store.entity.AlandaObjectProperties;
import io.alanda.object.store.entity.AlandaObjectType;

import java.util.Collection;
import java.util.List;

public interface AlandaObjectTypeService {

    List<AlandaObjectTypeDto> getAllAlandaObjectTypes();
    AlandaObjectTypeDto getAlandaObjectTypeById(Long guID);
    AlandaObjectTypeDto createAlandaObjectType(String name, String additionalPropertyConfig);
    AlandaObjectTypeDto updateAlandaObjectType(AlandaObjectTypeDto alandaObjectTypeDto);
}
