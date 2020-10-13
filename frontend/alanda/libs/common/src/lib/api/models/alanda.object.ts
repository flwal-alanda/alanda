import { AlandaObjectType } from './alanda.object.type';
import { AlandaObjectProperty } from './alanda.object.property';

export interface AlandaObject {
  guid?: number;
  objectType?: AlandaObjectType;
  objectProperties?: AlandaObjectProperty[];
  createDate?: string;
  createUser?: number;
  updateDate?: string;
  updateUser?: number;
}
