package io.alanda.object.store.dao.impl;

import io.alanda.base.dao.AbstractCrudDao;
import io.alanda.object.store.dao.AlandaObjectDao;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.entity.AlandaObject;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.Collection;
import java.util.List;

public class AlandaObjectDaoImpl extends AbstractCrudDao<AlandaObject> implements AlandaObjectDao {

    public AlandaObjectDaoImpl() { super();}
    public AlandaObjectDaoImpl(EntityManager em){ super(em);}

    @Override
    public EntityManager getEntityManager(){ return em;}

    @Override
    public AlandaObject getObjectById(Long objectId) {
        return em
                .createQuery("SELECT p FROM AlandaObject p where p.guid = :objectId",AlandaObject.class)
                .setParameter("objectId",objectId)
                .getSingleResult();
    }

    @Override
    public List<AlandaObject> getObjectsByTypeId(Long typeId) {
        return em
                .createQuery("SELECT p FROM AlandaObject p WHERE p.alandaObjectType.guid IN :typeId", AlandaObject.class)
                .setParameter("typeId",typeId)
                .getResultList();
    }

    /*@Override
    public void setAlandaObjectProperties(List<AlandaObjectPropertiesDto> alandaObjectProperties, Long guid) {
        Query query = em.createQuery("UPDATE AlandaObject p SET p.alandaObjectProperties = :alandaObjectProperties WHERE p.guid = :guid",AlandaObject.class);
        int updateCount = query
                .setParameter("alandaObjectProperties",alandaObjectProperties)
                .setParameter("guid",guid)
                .executeUpdate();
        em.flush();;
    }*/

    @Override
    public void createAlandaObject(Long typeId, List<AlandaObjectPropertiesDto> properties) {
        em.createNativeQuery("INSERT INTO AlandaObject (alandaObjectType,alandaObjectProperties)")
                .setParameter("alandaObjectType",typeId)
                .setParameter("alandaObjectProperties",properties)
                .executeUpdate();
    }
}
