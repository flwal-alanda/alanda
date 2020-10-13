import {AlandaObject, AlandaProject, AlandaTask} from "../../../../../../libs/common/src";

export class NniState  {
  task: AlandaTask;
  project: AlandaProject;
  nnis: NniProviderSelectionLine[];
  providers: NniProvider[];
}

export interface NniProviderSelectionLine {
  supplier: string;
  nni: string;
  reference: AlandaObject;
}

export interface NniProvider {
  guid: number;
  version: number;
  providerName: string;
  groupIdRef: number;
  contactMails: string[];
  pops: Pop[];
  slas: Sla[];
  countries: string[];
  users: User[];
  active: boolean;
}

export interface Pop {
  guid: number;
  siteId: string;
  location: string;
}

export interface Sla {
  guid: number;
  version: number;
  providerGuid: number;
  slaName: string;
  availabilityPeriod: string;
  availability: number;
  support: string;
  mttrOnsite: number;
  mttrRemote: number;
  diagnose: number;
  isDefault: boolean;
  active: boolean;
}

export interface User {
  guid: number;
  externalGuid?: any;
  source?: any;
  company?: any;
  loginName: string;
  firstName?: any;
  surname?: any;
  email: string;
  mobile?: any;
  groups?: any;
  roles?: any;
  locked: boolean;
  displayName: string;
  sso?: any;
  pmcDepartment?: any;
  sendOpenTaskMail: boolean;
  runAs?: any;
  stringPermissions?: any;
  objectPermissions: any[];
  admin: boolean;
  idName: string;
  refObjectType: string;
  refObjectId: number;
  objectName: string;
  refObjectDisplayName: string;
}




