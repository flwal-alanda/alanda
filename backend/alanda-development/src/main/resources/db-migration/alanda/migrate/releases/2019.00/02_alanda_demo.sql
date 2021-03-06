--liquibase formatted sql

--changeset fsa:alanda-demo-projecttype
Insert into PMC_PROJECTTYPE
 (GUID,VERSION,IDNAME,NAME,ALLOWEDTAGS,READRIGHTS,WRITERIGHTS,DELETERIGHTS,ALLOWEDPROCESSES,STARTPROCESS,OBJECTTYPE,ROLES,ALLOWED_SUBTYPES,ADDITIONAL_PROPERTIES,CONFIGURATION,LISTENERS,CREATERIGHTS,DETAILS_TEMPLATE,PROPERTIES_TEMPLATE,CREATION_PROPERTIES_TEMPLATE) values
 (1,1,'VACATION','Vacation Request','Tag1, Tag2, Tag3, Tag4','admin','admin','admin',null,'vacation-request','kk',null,null,null,null,'pmc-authorization','admin',null,'VACATION',null);


--changeset yk:2019-06-camunda-auth runOnChange:false
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (1,0,'project:create:VACATION');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (2,0,'project:read:VACATION');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (3,0,'project:write:VACATION');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (4,0,'project');

--changeset fsa:alanda-demo-users-and-groups
insert into pmc_group
(guid, groupname, longname, groupsource, created, createuser, version, active)
values (2, 'team-red', 'Team Red', 'alanda', sysdate, 1, 0, 1);

insert into pmc_group
(guid, groupname, longname, groupsource, created, createuser, version, active)
values (3, 'team-blue', 'Team Blue', 'alanda', sysdate, 1, 0, 1);

Insert into PMC_ROLE (GUID, VERSION, NAME)
values (1, 0, 'vacation-requestor');
Insert into PMC_ROLE (GUID, VERSION, NAME)
values (2, 0, 'vacation-approver');

insert into pmc_user
(guid, loginname, firstname, surname, email, source, version)
values (2, 'franzhr', 'Franz', 'HR', 'hr@alanda.io', 'alanda', 0);

insert into pmc_user
(guid, loginname, firstname, surname, email, source, version)
values (3, 'susihackler', 'Susi', 'Hackler', 'sh@alanda.io', 'alanda', 0);

insert into pmc_user
(guid, loginname, firstname, surname, email, source, version)
values (4, 'herbertputzer', 'Herbert', 'Putzer', 'hp@alanda.io', 'alanda', 0);

insert into pmc_user
(guid, loginname, firstname, surname, email, source, version)
values (5, 'hansleiden', 'Hans', 'Leiden', 'hl@alanda.io', 'alanda', 0);

insert into pmc_user_group
    (ref_user, ref_group, select_contact)
values (2, 2, 1);

insert into pmc_user_group
    (ref_user, ref_group, select_contact)
values (3, 2, 1);

insert into pmc_user_group
    (ref_user, ref_group, select_contact)
values (4, 3, 1);

insert into pmc_user_group
    (ref_user, ref_group, select_contact)
values (5, 3, 1);

insert into pmc_user_role
    (ref_user, ref_role)
values (2, 1);

insert into pmc_user_role
    (ref_user, ref_role)
values (3, 2);

insert into pmc_user_role
    (ref_user, ref_role)
values (4, 1);

insert into pmc_user_role
    (ref_user, ref_role)
values (5, 2);

--changeset yko:alanda-demo-milestones
Insert into PMC_MILESTONE (GUID, IDNAME, DESCRIPTION, CREATED, CREATEUSER, LASTUPDATE, UPDATEUSER, VERSION) values (1, 'VACATION_START', 'Vacation Start', CURRENT_DATE, 1, null, null, 1);
Insert into PMC_MILESTONE (GUID, IDNAME, DESCRIPTION, CREATED, CREATEUSER, LASTUPDATE, UPDATEUSER, VERSION) values (2, 'VACATION_END', 'Vacation End', CURRENT_DATE, 1, null, null, 1);

--changeset yko:alanda-demo-milestones-permissions
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (5,0,'ms:write:VACATION:*:*:VACATION_START:fc');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (6,0,'ms:write:VACATION:*:*:VACATION_END:fc');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (7,0,'ms:write:VACATION:*:*:VACATION_START:act');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (8,0,'ms:write:VACATION:*:*:VACATION_END:act');
Insert into PMC_PERMISSION (GUID,VERSION,KEY) values (9,0,'ms');

Insert into PMC_GROUP_PERMISSION (REF_GROUP, REF_PERMISSION) values (1,4);
Insert into PMC_GROUP_PERMISSION (REF_GROUP, REF_PERMISSION) values (1,9);
