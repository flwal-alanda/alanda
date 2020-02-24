package io.alanda.object.store.dao.impl;

import io.alanda.base.dao.AbstractCrudDao;
import io.alanda.base.dao.impl.PmcPropertyDaoImpl;
import io.alanda.object.store.dao.AlandaObjectPropertiesDao;
import io.alanda.object.store.entity.AlandaObject;
import io.alanda.object.store.entity.AlandaObjectProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

public class AlandaObjecPropertiesDaoImpl extends AbstractCrudDao<AlandaObjectProperties> implements AlandaObjectPropertiesDao {

    protected static final Logger logger = LoggerFactory.getLogger(PmcPropertyDaoImpl.class);

    public AlandaObjecPropertiesDaoImpl() { super(); }
    public AlandaObjecPropertiesDaoImpl(EntityManager em){ super(em);}

    @Override
    public EntityManager getEntityManager() { return em; }

    @Override
    public AlandaObjectProperties getProperty(String key, AlandaObject alandaObject) {
        return getProperty(key,alandaObject.getGuid());
    }

    @Override
    public AlandaObjectProperties getProperty(String key, Long objectGuID) {
        if (logger.isDebugEnabled()) {
            logger
                    .debug(
                            "looking for property with key {}, objectGuid {}",
                            key,
                            objectGuID);
        }
        AlandaObjectProperties result = null;
        try{
            String query = "SELECT p FROM AlandaObjectProperties p WHERE p.key = :key";
            if( objectGuID != null){
                query += "AND p.alandaObject.guid = :objectGuID";
            }
        }catch (NoResultException nre){
            if(logger.isDebugEnabled()){
                logger.debug(
                        "No AlandaObjectProperty found for key {} and objectGuid {}",
                        key, objectGuID
                );
            }
        }catch (Exception e){
            logger.warn(
                    "An error occured while loading AlandaObjectProperty with key {} and objectGuid {}",
                    key,objectGuID
            );
            throw e;
        }
        return result;
    }

    @Override
    public List<AlandaObjectProperties> getPropertiesForObject(Long objectGuID) {
        return em
                .createQuery("select p from AlandaObjectProperties p where p.alandaObject.guid = :objectGuID",AlandaObjectProperties.class)
                .setParameter("objectGuID", objectGuID)
                .getResultList();
    }
    @Override
    public int deletePropertyLike(String keyLike,Long objectGuID){
        return deleteProperty(keyLike,true,objectGuID);
    }
    @Override
    public int deleteProperty(String key, Long objectGuID) {
        return deleteProperty(key,false,objectGuID);
    }

    private int deleteProperty(String key, boolean isLike, Long objectGuID){
        String keyComperator = isLike ? "LIKE" : "=";
        int result = 0;
        if(key != null){
            if(objectGuID != null){
                try{
                    String query = "DELETE FROM AlandaObjectProperties p WHERE p.key" + keyComperator + " :key";
                    if( objectGuID != null){
                        query += "AND p.alandaObject.guid = :objectGuID";
                    }
                }catch (Exception e){
                    logger.warn(
                            "An error occured while deleting AlandaObjectProperty with key {} and objectGuid {}",
                            key,objectGuID
                    );
                    throw e;
                }
            }
        }
        return result;
    }
}
