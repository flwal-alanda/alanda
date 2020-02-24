package io.alanda.object.store.dto;

import io.alanda.object.store.entity.AlandaObject;

import java.util.*;

public class AlandaObjectTypeDto {

    private long guid;
    private String name;
    private String additionalPropertyConfig;
    private List<AlandaObject> alandaObjects = new ArrayList<AlandaObject>();

    public long getGuid() {
        return guid;
    }

    public void setGuid(long guid) {
        this.guid = guid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdditionalPropertyConfig() {
        return additionalPropertyConfig;
    }

    public void setAdditionalPropertyConfig(String additionalPropertyConfig) {
        this.additionalPropertyConfig = additionalPropertyConfig;
    }

    public List<AlandaObject> getAlandaObjects() {
        return alandaObjects;
    }

    public void setAlandaObjects(List<AlandaObject> alandaObjects) {
        this.alandaObjects = alandaObjects;
    }
}
