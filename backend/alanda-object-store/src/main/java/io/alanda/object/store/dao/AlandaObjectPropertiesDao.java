package io.alanda.object.store.dao;

import io.alanda.base.dao.CrudDao;
import io.alanda.object.store.entity.AlandaObject;
import io.alanda.object.store.entity.AlandaObjectProperties;

import java.util.List;

public interface AlandaObjectPropertiesDao extends CrudDao<AlandaObjectProperties> {

    AlandaObjectProperties getProperty(String key, AlandaObject alandaObject);
    AlandaObjectProperties getProperty(String key, Long objectGuID);
    List<AlandaObjectProperties> getPropertiesForObject(Long objectGuID);
    int deleteProperty(String key,Long objectGuID);
    int deletePropertyLike(String keyLike,Long objectGuID);
}
