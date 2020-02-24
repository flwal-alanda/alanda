package io.alanda.object.store.entity;
import io.alanda.base.entity.AbstractEntity;

import javax.persistence.*;

@Entity
@Table(name = "ALANDA_OBJECT_PROPERTIES")
public class AlandaObjectProperties extends AbstractEntity {

    @ManyToOne()
    @JoinColumn(name = "OID")
    private AlandaObject alandaObject;

    @Column(columnDefinition = "VALUE")
    private String value;

    @Column(columnDefinition = "KEY")
    private String key;

    @Column(columnDefinition = "TYPE")
    private String type;

    public AlandaObject getAlandaObject() {
        return alandaObject;
    }

    public void setAlandaObject(AlandaObject alandaObject) {
        this.alandaObject = alandaObject;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
