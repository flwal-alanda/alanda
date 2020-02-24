package io.alanda.object.store.dto;

import io.alanda.object.store.entity.AlandaObjectType;

import java.io.*;
import java.util.*;

public class AlandaObjectDto implements Serializable {

    private long guid;
    private AlandaObjectType objectTypeID;
    private List<AlandaObjectPropertiesDto> objectProperties;
    private Date created;
    private long CreateUser;
    private Date lastUpdate;
    private long updateUser;

    public long getGuid() {
        return guid;
    }

    public void setGuid(long guid) {
        this.guid = guid;
    }

    public AlandaObjectType getObjectTypeID() {
        return objectTypeID;
    }

    public void setObjectTypeID(AlandaObjectType objectTypeID) {
        this.objectTypeID = objectTypeID;
    }

    public List<AlandaObjectPropertiesDto> getObjectProperties() {
        return objectProperties;
    }

    public void setObjectProperties(List<AlandaObjectPropertiesDto> objectProperties) {
        this.objectProperties = objectProperties;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public long getCreateUser() {
        return CreateUser;
    }

    public void setCreateUser(long createUser) {
        CreateUser = createUser;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public long getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(long updateUser) {
        this.updateUser = updateUser;
    }
}
