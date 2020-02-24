package io.alanda.object.store.dto;

public class AlandaObjectPropertiesDto {

    private Long guid;
    private AlandaObjectDto alandaObject;
    private String key;
    private String value;
    private String valueType;

    public Long getGuid() {
        return guid;
    }

    public void setGuid(Long guid) {
        this.guid = guid;
    }

    public AlandaObjectDto getAlandaObject() {
        return alandaObject;
    }

    public void setAlandaObject(AlandaObjectDto alandaObject) {
        this.alandaObject = alandaObject;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueType() {
        return valueType;
    }

    public void setValueType(String valueType) {
        this.valueType = valueType;
    }
}
