package io.alanda.object.store.service.impl;

import io.alanda.base.util.DozerMapper;
import io.alanda.object.store.dao.AlandaObjectDao;
import io.alanda.object.store.dao.AlandaObjectPropertiesDao;
import io.alanda.object.store.dao.AlandaObjectTypeDao;
import io.alanda.object.store.dto.AlandaObjectDto;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.entity.AlandaObject;
import io.alanda.object.store.entity.AlandaObjectProperties;
import io.alanda.object.store.entity.AlandaObjectType;
import io.alanda.object.store.service.AlandaObjectService;

import javax.inject.Inject;
import java.util.List;

public class AlandaObjectServiceImpl implements AlandaObjectService {

    @Inject
    private AlandaObjectTypeDao alandaObjectTypeDao;

    @Inject
    private AlandaObjectDao alandaObjectDao;

    @Inject
    private AlandaObjectPropertiesDao alandaObjectPropertiesDao;

    @Inject
    private DozerMapper dozerMapper;

    @Override
    public List<AlandaObjectDto> getAllAlandaObjectsByType(Long typeID) {
        return dozerMapper.mapCollection(alandaObjectDao.getObjectsByTypeId(typeID),AlandaObjectDto.class);
    }

    @Override
    public AlandaObjectDto getAlandaObjectByID(Long guID) {
        return dozerMapper.map(alandaObjectDao.getObjectById(guID),AlandaObjectDto.class);
    }

    @Override
    public List<AlandaObjectDto> getAllAlandaObjects() {
        return dozerMapper.mapCollection(alandaObjectDao.getAll(),AlandaObjectDto.class);
    }

    @Override
    public void createAlandaObject(Long typeID, List<AlandaObjectPropertiesDto> properties) {
        alandaObjectDao.createAlandaObject(typeID, properties);

    }

    @Override
    public AlandaObjectDto updateAlandaObject(AlandaObjectDto alandaObjectDto) {
        AlandaObject alandaObject = alandaObjectDao.getObjectById(alandaObjectDto.getGuid());
        if(alandaObject == null){
            throw new IllegalArgumentException("no object with guid " + alandaObjectDto.getGuid() + " found");
        }
        alandaObject.setAlandaObjectType(alandaObjectDto.getObjectTypeID());
        alandaObject.setAlandaObjectProperties(alandaObjectPropertiesDao.getPropertiesForObject(alandaObject.getGuid()));
        return dozerMapper.map( alandaObjectDao.update(alandaObject),AlandaObjectDto.class);
    }
}
