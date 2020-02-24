package io.alanda.object.store.dao;

import io.alanda.base.dao.CrudDao;
import io.alanda.object.store.entity.AlandaObjectType;

import java.util.List;

public interface AlandaObjectTypeDao extends CrudDao<AlandaObjectType> {

    public AlandaObjectType getByName(String name);
    public List<AlandaObjectType> searchByName(String searchTerm);
}
