package io.alanda.object.store.dao;

import io.alanda.base.dao.CrudDao;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.entity.AlandaObject;

import java.util.Collection;
import java.util.List;

public interface AlandaObjectDao extends CrudDao<AlandaObject> {

    AlandaObject getObjectById(Long guid);
    List<AlandaObject> getObjectsByTypeId(Long typeId);
    //void setAlandaObjectProperties(List<AlandaObjectPropertiesDto> alandaObjectProperties, Long guid);
    void createAlandaObject(Long typeId,List<AlandaObjectPropertiesDto> properties);
}
