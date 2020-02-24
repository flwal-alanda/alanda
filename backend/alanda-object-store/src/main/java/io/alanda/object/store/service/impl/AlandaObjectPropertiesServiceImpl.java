package io.alanda.object.store.service.impl;

import io.alanda.base.util.DozerMapper;
import io.alanda.object.store.dao.AlandaObjectDao;
import io.alanda.object.store.dao.AlandaObjectPropertiesDao;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.entity.AlandaObject;
import io.alanda.object.store.entity.AlandaObjectProperties;
import io.alanda.object.store.service.AlandaObjectPropertiesSerivce;
import oracle.sql.DATE;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class AlandaObjectPropertiesServiceImpl implements AlandaObjectPropertiesSerivce {

    protected static final Logger logger = LoggerFactory.getLogger(AlandaObjectPropertiesServiceImpl.class);

    @Inject
    private AlandaObjectPropertiesDao alandaObjectPropertiesDao;

    @Inject
    private AlandaObjectDao alandaObjectDao;

    @Inject
    private DozerMapper dozerMapper;

    @Override
    public Object getProperty(Long objectGuid, String key) {
       AlandaObjectProperties property = alandaObjectPropertiesDao.getProperty(key, objectGuid);
       return convertPropertyToType(property);
    }

    @Override
    public String getStringProperty(Long objectGuid, String key) {
        return (String) getProperty(objectGuid,key);
    }

    @Override
    public Integer getIntegerProperty(Long objectGuid, String key) {
        return (Integer) getProperty(objectGuid,key);
    }

    @Override
    public Date getDateProperty(Long objectGuid, String key) {
        return (Date) getProperty(objectGuid,key);
    }

    @Override
    public Boolean getBooleanProperty(Long objectGuid, String key) {
        return (Boolean) getProperty(objectGuid,key);
    }

    @Override
    public Long getLongProperty(Long objectGuid, String key) {
        return (Long) getProperty(objectGuid,key);
    }

    @Override
    public void setProperty(Long objectGuid, String key, Object value, AlandaObjectPropertyType valueType) {
        if(key == null)
            throw new IllegalArgumentException("Key is not set!");
        if(value == null)
            throw new IllegalArgumentException("Value is not set!");
        // String default type
        if(valueType == null)
            valueType = AlandaObjectPropertiesSerivce.AlandaObjectPropertyType.STRING;

        String valueString;
        if(Objects.equals(valueType, AlandaObjectPropertyType.DATE) && value instanceof DATE){
            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
            valueString = sdf.format(value);
        }else {
            valueString = value.toString();
        }
        //check if Property exists
        AlandaObjectProperties alandaObjectProperties = alandaObjectPropertiesDao.getProperty(key,objectGuid);
        if(alandaObjectProperties == null) {
            alandaObjectProperties = new AlandaObjectProperties();
            if (objectGuid != null) {
                AlandaObject alandaObject = alandaObjectDao.getById(objectGuid);
                if (alandaObject == null) {
                    throw new RuntimeException("No object with GUID " + objectGuid + "found");
                }
                alandaObjectProperties.setAlandaObject(alandaObject);
            }
            alandaObjectProperties.setKey(key);
            alandaObjectProperties.setValue(valueString);
            alandaObjectProperties.setType(valueType.toString());
            alandaObjectPropertiesDao.create(alandaObjectProperties);
        }else{
            if(Objects.equals(valueString, alandaObjectProperties.getValue()) && Objects.equals(valueType.toString(), alandaObjectProperties.getType())){
                return;
            }
            alandaObjectProperties.setValue(valueString);
            alandaObjectProperties.setType(valueType.toString());
        }
        alandaObjectPropertiesDao.getEntityManager().flush();
    }

    @Override
    public List<AlandaObjectPropertiesDto> getPropertiesForProject(Long objectId) {
        return dozerMapper.mapCollection(alandaObjectPropertiesDao.getPropertiesForObject(objectId), AlandaObjectPropertiesDto.class);
    }

    @Override
    public int deleteProperty(long objectGuid, String key) {
        return alandaObjectPropertiesDao.deleteProperty(key, objectGuid);
    }

    @Override
    public int deletePropertyLike(long objectGuid, String keyLike) {
        return alandaObjectPropertiesDao.deletePropertyLike(keyLike, objectGuid);
    }

    @Override
    public void setBooleanProperty(Long objectId, String key, String value) {
        setProperty(objectId,key,value,AlandaObjectPropertyType.BOOLEAN);
    }

    @Override
    public void setStringProperty(Long objectId, String key, String value) {
        setProperty(objectId,key,value,AlandaObjectPropertyType.STRING);
    }

    @Override
    public void setProperty(Long objectId, String key, Object value) {
        setProperty(objectId,key,value,AlandaObjectPropertyType.STRING);
    }

    private Object convertPropertyToType(AlandaObjectProperties alandaObjectProperty){
        if(alandaObjectProperty == null)
            return null;
        //TYPE == STRING
        if(alandaObjectProperty.getType().equals(AlandaObjectPropertyType.STRING.toString()))
            return alandaObjectProperty.getValue();
        //TYPE == INTEGER
        if(alandaObjectProperty.getType().equals(AlandaObjectPropertyType.INTEGER.toString()))
            return Integer.valueOf(alandaObjectProperty.getValue());
        //TYPE == LONG
        if(alandaObjectProperty.getType().equals(AlandaObjectPropertyType.LONG.toString()))
            return Long.valueOf(alandaObjectProperty.getValue());
        //TYPE == BOOLEAN
        if(alandaObjectProperty.getType().equals(AlandaObjectPropertyType.BOOLEAN.toString()))
            return Boolean.valueOf(alandaObjectProperty.getValue());
        //TYPE == DATE
        if(alandaObjectProperty.getType().equals(AlandaObjectPropertyType.DATE.toString()))
            return convertPropertyValueToDate(alandaObjectProperty.getValue());
        //TYPE == UNSUPPORTED
        throw new RuntimeException("Unsupported AlandaPropertyType"+ alandaObjectProperty.getType());
    }

    private Date convertPropertyValueToDate(String value) {
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        try {
            return formatter.parse(value);
        } catch (ParseException e) {
            throw new RuntimeException("Date of property could not be parsed!");
        }
    }
}
