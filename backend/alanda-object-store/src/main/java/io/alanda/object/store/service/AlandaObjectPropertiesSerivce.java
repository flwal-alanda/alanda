package io.alanda.object.store.service;

import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.alanda.object.store.entity.AlandaObjectProperties;

import java.util.Date;
import java.util.List;

public interface AlandaObjectPropertiesSerivce {

    enum AlandaObjectPropertyType{
        STRING,
        INTEGER,
        DATE,
        BOOLEAN,
        LONG
    }

    String dateFormat = "dd.MM.yy HH:mm";
    Object getProperty(Long objectGuid, String key);
    String getStringProperty(Long objectGuid, String key);
    Integer getIntegerProperty(Long objectGuid, String key);
    Date getDateProperty(Long objectGuid, String key);
    Boolean getBooleanProperty(Long objectGuid, String key);
    Long getLongProperty(Long objectGuid, String key);
    void setProperty(Long objectGuid,String key, Object value, AlandaObjectPropertyType valueType);
    List<AlandaObjectPropertiesDto> getPropertiesForProject(Long objectId);
    int deleteProperty(long objectGuid, String key);
    int deletePropertyLike(long objectGuid, String keyLike);
    void setBooleanProperty(Long objectId, String key, String value);
    void setStringProperty(Long objectId, String key, String value);
    void setProperty(Long objectId,String key, Object value);

}
