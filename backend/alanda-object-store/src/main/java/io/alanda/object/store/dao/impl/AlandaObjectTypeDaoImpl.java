package io.alanda.object.store.dao.impl;

import io.alanda.base.dao.AbstractCrudDao;
import io.alanda.object.store.dao.AlandaObjectTypeDao;
import io.alanda.object.store.entity.AlandaObjectType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.List;

public class AlandaObjectTypeDaoImpl extends AbstractCrudDao<AlandaObjectType> implements AlandaObjectTypeDao {

    private final Logger logger = LoggerFactory.getLogger(AlandaObjectTypeDaoImpl.class);
    public AlandaObjectTypeDaoImpl(){ super();}
    public AlandaObjectTypeDaoImpl(EntityManager em ){ super(em);}

    @Override
    public EntityManager getEntityManager() { return em;}

    @Override
    public AlandaObjectType getByName(String name) {
        return em
                .createQuery("SELECT p FROM AlandaObjectType p WHERE p.name = :name", AlandaObjectType.class)
                .setParameter("name",name)
                .getSingleResult();
    }

    @Override
    public List<AlandaObjectType> searchByName(String searchTerm) {
        return em
                .createQuery("SELECT p FROM AlandaObjectType p WHERE LOWER(p.name) like LOWER(:searchTerm)",AlandaObjectType.class)
                .setParameter("searchTerm",searchTerm + "%")
                .getResultList();
    }
}
