package io.alanda.object.store.entity;
import io.alanda.base.entity.AbstractAuditEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ALANDA_OBJECT")
public class AlandaObject extends AbstractAuditEntity{

    @ManyToOne()
    @JoinColumn(name = "BOTID")
    private AlandaObjectType alandaObjectType;

    @OneToMany(mappedBy = "alandaObject")
    private List<AlandaObjectProperties> alandaObjectProperties = new ArrayList<AlandaObjectProperties>();

    public AlandaObjectType getAlandaObjectType() {
        return alandaObjectType;
    }

    public void setAlandaObjectType(AlandaObjectType alandaObjectType) {
        this.alandaObjectType = alandaObjectType;
    }

    public List<AlandaObjectProperties> getalandaObjectProperties() {
        return alandaObjectProperties;
    }

    public void setAlandaObjectProperties(List<AlandaObjectProperties> properties) {
        this.alandaObjectProperties = properties;
    }
}
