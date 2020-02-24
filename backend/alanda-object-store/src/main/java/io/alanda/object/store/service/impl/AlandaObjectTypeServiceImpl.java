package io.alanda.object.store.service.impl;

import io.alanda.base.util.DozerMapper;
import io.alanda.object.store.dao.AlandaObjectTypeDao;
import io.alanda.object.store.dto.AlandaObjectDto;
import io.alanda.object.store.dto.AlandaObjectTypeDto;
import io.alanda.object.store.entity.AlandaObjectType;
import io.alanda.object.store.service.AlandaObjectTypeService;

import javax.inject.Inject;
import java.util.Collection;
import java.util.List;

public class AlandaObjectTypeServiceImpl implements AlandaObjectTypeService {

    @Inject
    AlandaObjectTypeDao alandaObjectTypeDao;

    @Inject
    DozerMapper dozerMapper;

    @Override
    public List<AlandaObjectTypeDto> getAllAlandaObjectTypes() {
        return dozerMapper.mapCollection(alandaObjectTypeDao.getAll(),AlandaObjectTypeDto.class);
    }

    @Override
    public AlandaObjectTypeDto getAlandaObjectTypeById(Long guID) {
        return dozerMapper.map(alandaObjectTypeDao.getById(guID),AlandaObjectTypeDto.class);
    }

    public AlandaObjectTypeDto getAlandaObjectTypeByName(String name) {
        return dozerMapper.map(alandaObjectTypeDao.getByName(name),AlandaObjectTypeDto.class);
    }
    @Override
    public AlandaObjectTypeDto createAlandaObjectType(String name, String additionalPropertyConfig) {
        AlandaObjectType alandaObjectType = new AlandaObjectType();
        alandaObjectType.setName(name);
        alandaObjectType.setAdditionalPropertyConfig(additionalPropertyConfig);
        return dozerMapper.map(alandaObjectType,AlandaObjectTypeDto.class);
    }

    @Override
    public AlandaObjectTypeDto updateAlandaObjectType(AlandaObjectTypeDto alandaObjectTypeDto) {
        AlandaObjectType chg = alandaObjectTypeDao.getById(alandaObjectTypeDto.getGuid());
        chg.setAdditionalPropertyConfig(alandaObjectTypeDto.getAdditionalPropertyConfig());
        chg.setAlandaObjects(alandaObjectTypeDto.getAlandaObjects());
        chg.setName(alandaObjectTypeDto.getName());
        return dozerMapper.map(alandaObjectTypeDao.update(chg),AlandaObjectTypeDto.class);
    }
}
