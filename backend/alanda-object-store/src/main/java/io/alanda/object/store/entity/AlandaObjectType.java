package io.alanda.object.store.entity;
import io.alanda.base.entity.AbstractEntity;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "ALANDA_OBJECT_TYPE")
public class AlandaObjectType extends AbstractEntity {

    @OneToMany(mappedBy = "alandaObjectType")
    private List<AlandaObject> alandaObjects = new ArrayList<AlandaObject>();

    @Column(columnDefinition = "NAME UNIQUE")
    private String name;

    @Column(columnDefinition = "ADDITIONAL_PROPERTY_CONFIG")
    private String additionalPropertyConfig;

    public List<AlandaObject> getAlandaObjects() {
        return alandaObjects;
    }

    public void setAlandaObjects(List<AlandaObject> alandaObjects) {
        this.alandaObjects = alandaObjects;
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
}
