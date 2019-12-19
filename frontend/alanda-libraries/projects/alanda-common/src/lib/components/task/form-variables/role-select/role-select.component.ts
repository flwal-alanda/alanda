
import { Component, OnInit, Input } from "@angular/core";
import { SelectItemGroup, SelectItem } from "primeng/api";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Project } from "../../../../models/project";
import { PmcGroup } from "../../../../models/pmcGroup";
import { PmcUser } from "../../../../models/pmcUser";
import { PmcRole } from "../../../../models/pmcRole";
import { PmcGroupServiceNg } from "../../../../api/pmcgroup.service";
import { PmcRoleServiceNg } from "../../../../api/pmcrole.service";
import { PropertyService } from "../../../../api/property.service";
import { FormsRegisterService } from "../../../../services/forms-register.service";
import { PmcUserServiceNg } from "../../../../api/pmcuser.service";
import { concatMap, mergeMap } from "rxjs/operators";

@Component({
    selector: 'role-select',
    templateUrl: './role-select.component.html',
    styleUrls: [],
  })
export class SelectRoleComponent implements OnInit {

    @Input() project: Project;
    @Input() type: string; //'user' or 'group', determines if suggestions should be of type group or user
    @Input() displayName: string;
    @Input() roleName: string;
    @Input() onlyInherited?: boolean = true; // if type == user and if set to false, also include users who have the group assigned directly
    @Input() groupFilter?: string[]; // if type == user, additional filtering for groups is possible
    @Input() grouping?: boolean = false; // if type == user, group users by their groups in dropdown
    //TODO: @Input() parent?: SelectRoleComponent;
    @Input() formName: string;
    groups: PmcGroup[];
    items: string[] = [];
    options: {label: string, value: number}[] = [];
    optionsGrouped: SelectItemGroup[] = [];
    role: PmcRole;
    roleSelectFormGroup: FormGroup;

    constructor(private userService: PmcUserServiceNg, private propService: PropertyService,
                private groupService: PmcGroupServiceNg, private roleService: PmcRoleServiceNg, 
                private formsRegisterService: FormsRegisterService){}

    ngOnInit(){  
      this.initFormGroup();
      this.loadDropdown();
    }

    loadDropdown() {
      if(this.type === 'user') {
        if(!this.onlyInherited) {
          if(this.grouping) {
            console.warn('grouping = true is not allowed when onlyInherited is set to true');
          } else {
            this.options = [];
            this.roleService.getRoleByName(this.roleName).pipe(
            mergeMap(role => {this.role = role; return this.userService.getUsersForRole(role.guid)}))
            .subscribe(users => this.addUsersToOptions(users));
          }
        } else {
          this.addUsersToOptions();
        }
      } else if(this.type === 'group') {
        if(this.grouping) {
          console.warn('grouping input has no effect when type is set to group');
        }
        if(this.groupFilter) {
          console.warn('groupFilter input has no effect when type is set to group');
        }
        if(this.onlyInherited) {
          console.warn('onlyInherited input has no effect when type is set to group');
        }
        this.optionsGrouped = [];
        this.groupService.getGroupsForRole(this.roleName).subscribe(groups => {
          this.options = groups.map(group => {
            return {label: group.longName, value: group.guid};
          });
          this.loadProperty();
        })
      } else console.warn('wrong type input for role-select');
    }

    private addUsersToOptions(u?: PmcUser[]) {
      this.groupService.getGroupsForRole(this.roleName).subscribe(groups => {
        this.groups = groups;
        this.groups.forEach(group => {
          this.userService.getUsersByGroupId(group.guid).subscribe(users => {
            if(u) {
              users.push(...u);
            }
            if(this.grouping) {
              let mappedUsers: SelectItem[] = [];
              mappedUsers.push(...users.map(user => {return {label: user.displayName, value: user.guid}}));
              this.optionsGrouped.push({label: group.longName, items: mappedUsers});
              this.optionsGrouped = [...this.optionsGrouped];
            } else {
              users.forEach(user => {
                if(this.options.filter(entry => entry.label == user.displayName).length == 0) {
                  this.options.push({label: user.displayName, value: user.guid});
                  this.options = [...this.options];
                }
              }); 
            }
            this.loadProperty();
          });
        });
      })
    }

    private initFormGroup() {
      this.roleSelectFormGroup = new FormGroup({
        selected: new FormControl('', Validators.required)
      });
      this.formsRegisterService.registerForm(this.roleSelectFormGroup, this.formName);
    }

    private loadProperty() {
      if(this.type == 'user') {
        this.propService.get(null, 'user', this.project.guid,  'role_' + this.roleName).pipe(
          concatMap(res => this.userService.getUser(Number(res.value)))
        ).subscribe(user => {
          if(this.grouping) {
            this.optionsGrouped.forEach(group => {
              let filteredGroup = group.items.filter(item => item.value === user.guid);
              if(filteredGroup.length > 0) {
                const item = filteredGroup[0];
                this.roleSelectFormGroup.get('selected').setValue(item.value);
                return;
              }
            })
          } else {
            this.roleSelectFormGroup.get('selected').setValue({label: user.displayName, value: user.guid});
          }
        });
      } else if(this.type == 'group') {
        this.propService.get(null, 'group', this.project.guid,  'role_grp_' + this.roleName).pipe(
          concatMap(res => this.groupService.getGroupByGuid(Number(res.value)))
        ).subscribe(group => {
          if(group) {
            this.roleSelectFormGroup.get('selected').setValue({label: group.longName, value: group.guid});
          }
        });
      } 
    }

    onChange() {
      if(this.type == 'user') {
        let selected = this.grouping ? this.roleSelectFormGroup.get('selected') : this.roleSelectFormGroup.get('selected').value;
        this.propService.setString(null, 'user', this.project.guid, 'role_' + this.roleName, selected.value).subscribe();
      } else if(this.type == 'group') {
        let selected = this.roleSelectFormGroup.get('selected').value;
        this.propService.setString(null, 'group', this.project.guid, 'role_grp_' + this.roleName, selected.value).subscribe();
      }
    }

    
  }